from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
import numpy as np
import torch
import json
from pathlib import Path
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Tell FastAPI which origins (front-end URLs) are allowed
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173", 
        "http://127.0.0.1:5173"  
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Load BERT once at startup ---
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model     = BertModel.from_pretrained('bert-base-uncased')

# --- Load courses from JSON ---
courses_data = json.loads(Path("courses.json").read_text())

# --- Pydantic models ---
class Quiz(BaseModel):
    score: float
    course: str

class UserProfile(BaseModel):
    profession: str
    preferences: List[str]
    quiz: Optional[Quiz]

class RecommendationRequest(BaseModel):
    user: UserProfile


# --- Helper: get BERT embedding of text ---
def get_bert_embedding(text: str) -> np.ndarray:
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state[:, 0, :].numpy()

# Precompute once at startup (MASSIVE performance boost!)
course_embeddings = {course['id']: get_bert_embedding(
    f"Title: {course['title']}; "
    f"Description: {course['description']}; "
    f"Tags: {', '.join(course['tags'])}"
) for course in courses_data}



# --- Main recommendation endpoint ---
@app.post("/recommend")
async def recommend(request: RecommendationRequest) -> Dict[str, Any]:
    user = request.user
    print("******************************")
    print("Received User request",user)
    print("******************************")

    # 🎭 1. Build the user text—with extra weight on preferences!
    quiz_text = f"Quiz: {user.quiz.course} with score {user.quiz.score}%" if user.quiz else "No quiz"
    prefs = ", ".join(user.preferences)
    # mention preferences TWICE for extra weight
    # More nuanced weighting
    user_text = (
        f"Profession: {user.profession}. "
        f"Interests: {prefs}. " 
        f"Technical skills: {prefs}. "  # Different context
        f"Assessment: scored {user.quiz.score}% in {user.quiz.course}"
    )

    # 🔍 2. Filter courses by profession (only relevant actors take the stage)
    filtered_courses = [
        c for c in courses_data
        if user.profession in c["profession"]
        # and "C++" not in c["tags"]    # <-- Uncomment to exclude C++ courses!
    ]

    # ⚠️ If no course matches profession, fallback to all
    if not filtered_courses:
        filtered_courses = courses_data

    # 🪄 3. Embed user and each filtered course
    course_vectors = [course_embeddings[course['id']] for course in filtered_courses]
    
    # Skip if no courses
    if not course_vectors:
        return {"recommendations": []}
    user_vec = get_bert_embedding(user_text)
    
    
    

    # 📊 4. Compute cosine similarities
    course_matrix = np.vstack(course_vectors)
    sims = cosine_similarity(user_vec, course_matrix)[0]

    # 🏆 5. Pick top 5 with scores
    n = min(5, len(sims))  # Get min of 5 or actual number of courses
    top_idxs = np.argsort(sims)[-n:][::-1]
    recs = []
    for idx in top_idxs:
        course = filtered_courses[idx]
        recs.append({
            "id":    course["id"],
            "title": course["title"],
            "score": round(float(sims[idx]) * 100, 2)  # % match
        })

    print(f"Filtered courses: {len(filtered_courses)}")
    print(f"Recommendations: {len(recs)}")
    # 📬 Return recommendations + why they shined
    return {"recommendations": recs}
