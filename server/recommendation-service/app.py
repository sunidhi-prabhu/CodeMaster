import os
import json
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pymongo
# from threat_intel import check_threat_ip  # Optional security middleware

# === FastAPI Setup ===
app = FastAPI()

# CORS (allow frontend on Vite / React dev server)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # tighten later for prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.middleware("http")(check_threat_ip)  # optional threat intel

# === Database and Model Setup ===
mongo_client = pymongo.MongoClient(os.environ.get("MONGO_URI") or "mongodb://localhost:27017/")
db = mongo_client["elearning-ai"]
course_embeddings_collection = db["courseEmbeddings"]

# Load embedding model once
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

# === Pydantic Models ===
class Quiz(BaseModel):
    score: Optional[float]
    course: Optional[str]

class UserProfile(BaseModel):
    profession: str
    preferences: List[str]
    quiz: Optional[Quiz]

class RecommendationRequest(BaseModel):
    user: UserProfile

# === Load Courses ===
with open("courses.json", "r") as f:
    COURSES = json.load(f)

# === Helper Functions ===
def build_course_text(course: dict) -> str:
    """Builds a text string from course fields for embedding."""
    title = course.get("title", "")
    desc = course.get("description", "")
    tags = ", ".join(course.get("tags", []))
    profession = ", ".join(course.get("profession", []))
    return f"Title: {title}, Description: {desc}, Tags: {tags}, Profession: {profession}"

def cache_course_embeddings(courses: List[dict]):
    """Cache embeddings in Mongo for faster reuse."""
    for course in courses:
        course_text = build_course_text(course)
        embedding = model.encode([course_text], show_progress_bar=False)[0]
        course_id = course["id"]
        course_embeddings_collection.update_one(
            {"courseId": course_id},
            {"$set": {"embedding": embedding.tolist()}},
            upsert=True
        )

# === Startup: cache embeddings ===
@app.on_event("startup")
async def startup_event():
    if COURSES:
        cache_course_embeddings(COURSES)

# === Root Endpoint ===
@app.get("/")
async def root():
    return {"message": "API is running 🚀"}

# === Recommendation Endpoint ===
@app.post("/recommend")
async def recommend(request: RecommendationRequest):
    try:
        user = request.user
        if not user.preferences and not user.profession:
            raise HTTPException(status_code=400, detail="Invalid input: user data missing")

        # --- Step 1: Strict match filtering ---
        user_prefs = set(pref.strip().lower() for pref in user.preferences)
        strict_courses = [
            course for course in COURSES
            if any(
                (pref in [t.strip().lower() for t in course["tags"]]) or
                pref in (course["title"].lower() + " " + course["description"].lower())
                for pref in user_prefs
            ) or (user.profession in [p.strip() for p in course["profession"]])
        ]
        filtered_courses = strict_courses or COURSES

        # --- Step 2: Build user profile embedding ---
        quiz_part = (
            f"Quiz: {user.quiz.course} with score {user.quiz.score}%"
            if user.quiz else "No quiz"
        )
        user_text = (
            f"Profession: {user.profession}, "
            f"Preferences: {', '.join(user.preferences)}, {quiz_part}"
        )
        user_embedding = model.encode([user_text], show_progress_bar=False)[0]

        # --- Step 3: Get embeddings for courses ---
        course_embeddings = []
        for course in filtered_courses:
            doc = course_embeddings_collection.find_one({"courseId": course["id"]})
            if doc and "embedding" in doc:
                course_embeddings.append(np.array(doc["embedding"]))
            else:
                course_text = build_course_text(course)
                embedding = model.encode([course_text], show_progress_bar=False)[0]
                course_embeddings.append(embedding)
                course_embeddings_collection.update_one(
                    {"courseId": course["id"]},
                    {"$set": {"embedding": embedding.tolist()}},
                    upsert=True
                )

        course_embeddings = np.array(course_embeddings)
        similarities = cosine_similarity([user_embedding], course_embeddings)[0]

        # --- Step 4: Boost matches ---
        for i, course in enumerate(filtered_courses):
            course_tags = set(t.strip().lower() for t in course["tags"])
            if any(pref == t for pref in user_prefs for t in course_tags):
                similarities[i] *= 1.25
            if any(pref in course["title"].strip().lower() for pref in user_prefs):
                similarities[i] *= 1.1
            if user.profession in [p.strip().lower() for p in course["profession"]]:
                similarities[i] *= 1.3  # boost profession match

        # --- Step 5: Rank & select top N ---
        NUM_RECOMMEND = 10
        min_score = np.percentile(similarities, 80) if len(similarities) > 10 else max(similarities) * 0.6
        idx_sorted = np.argsort(similarities)[::-1]
        top_courses = [filtered_courses[i] for i in idx_sorted if similarities[i] >= min_score][:NUM_RECOMMEND]

        if not top_courses:
            top_indices = np.argsort(similarities)[-NUM_RECOMMEND:][::-1]
            top_courses = [filtered_courses[i] for i in top_indices if i < len(filtered_courses)]

        return {"recommendations": top_courses}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
