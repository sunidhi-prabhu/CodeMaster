import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import pymongo
from threat_intel import check_threat_ip

app = FastAPI()
app.middleware("http")(check_threat_ip) #changes

from threat_intel import check_threat_ip #changes
app.middleware("http")(check_threat_ip) #changes


# === Database and Model Setup ===
mongo_client = pymongo.MongoClient(os.environ.get("MONGO_URI") or "mongodb://localhost:27017/")
db = mongo_client["elearning-ai"]
course_embeddings_collection = db["courseEmbeddings"]

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

# === Pydantic Models ===
class Quiz(BaseModel):
    score: Optional[float]
    course: Optional[str]

class UserProfile(BaseModel):
    profession: str
    preferences: List[str]
    quiz: Optional[Quiz]

class Course(BaseModel):
    id: str
    title: str
    description: str
    tags: List[str]
    profession: List[str]

class RecommendationRequest(BaseModel):
    user: UserProfile
    courses: List[Course]

# === Helper Functions ===

def build_course_text(course):
    if isinstance(course, dict):
        title = course.get('title', '')
        desc = course.get('description', '')
        tags = ', '.join(course.get('tags', []))
        profession = ', '.join(course.get('profession', []))
    else:
        title = course.title
        desc = course.description
        tags = ', '.join(course.tags)
        profession = ', '.join(course.profession)
    return (
        f"Title: {title}, "
        f"Description: {desc}, "
        f"Tags: {tags}, "
        f"Profession: {profession}"
    )

def cache_course_embeddings(courses: List):
    for course in courses:
        course_text = build_course_text(course)
        embedding = model.encode([course_text], show_progress_bar=False)[0]
        course_id = course['id'] if isinstance(course, dict) else course.id
        course_embeddings_collection.update_one(
            {"courseId": course_id},
            {"$set": {"embedding": embedding.tolist()}},
            upsert=True
        )

@app.on_event("startup")
async def startup_event():
    courses_collection = db["courses"]
    courses = list(courses_collection.find())
    if courses:
        cache_course_embeddings(courses)

@app.get("/")
async def root():
    return {"message": "API is running"}

# === Recommendation Endpoint ===

@app.post("/recommend")
async def recommend(request: RecommendationRequest):
    try:
        if not request.user.preferences or not request.courses:
            raise HTTPException(
                status_code=400,
                detail="Invalid input: user preferences or courses missing"
            )

        # Strict match: exact/phrase tag or phrase in title/description
        user_prefs = set(pref.strip().lower() for pref in request.user.preferences)
        strict_courses = [
            course for course in request.courses
            if any(
                (pref in [t.strip().lower() for t in course.tags]) or
                pref in (course.title.lower() + " " + course.description.lower())
                for pref in user_prefs
            )
        ]
        filtered_courses = strict_courses or request.courses

        quiz_part = (
            f"Quiz: {request.user.quiz.course} with score {request.user.quiz.score}%"
            if request.user.quiz else "No quiz"
        )
        user_text = (
            f"Profession: {request.user.profession}, "
            f"Preferences: {', '.join(request.user.preferences)}, {quiz_part}"
        )
        user_embedding = model.encode([user_text], show_progress_bar=False)[0]

        course_embeddings = []
        for course in filtered_courses:
            doc = course_embeddings_collection.find_one({"courseId": course.id})
            if doc and "embedding" in doc:
                course_embeddings.append(np.array(doc["embedding"]))
            else:
                course_text = build_course_text(course)
                embedding = model.encode([course_text], show_progress_bar=False)[0]
                course_embeddings.append(embedding)
                course_embeddings_collection.update_one(
                    {"courseId": course.id},
                    {"$set": {"embedding": embedding.tolist()}},
                    upsert=True
                )
        course_embeddings = np.array(course_embeddings)
        similarities = cosine_similarity([user_embedding], course_embeddings)[0]

        # Boost strong, relevant DSA-style matches
        for i, course in enumerate(filtered_courses):
            course_tags = set(t.strip().lower() for t in course.tags)
            if any(pref == t for pref in user_prefs for t in course_tags):
                similarities[i] *= 1.25
            if any(pref in course.title.strip().lower() for pref in user_prefs):
                similarities[i] *= 1.1

        NUM_RECOMMEND = 10
        min_score = np.percentile(similarities, 80) if len(similarities) > 10 else max(similarities) * 0.6
        idx_sorted = np.argsort(similarities)[::-1]
        top_courses = [filtered_courses[i] for i in idx_sorted if similarities[i] >= min_score][:NUM_RECOMMEND]

        if not top_courses:
            top_indices = np.argsort(similarities)[-NUM_RECOMMEND:][::-1]
            top_courses = [filtered_courses[i] for i in top_indices if i < len(filtered_courses)]

        return {"recommendations": [c.dict() if hasattr(c, "dict") else c for c in top_courses]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
