# server/recommendation-service/app.py
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import numpy as np
from transformers import BertTokenizer, BertModel
import torch
from sklearn.metrics.pairwise import cosine_similarity

app = FastAPI()

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Pydantic models for request validation
class Quiz(BaseModel):
    score: float
    course: str

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

# Generate BERT embeddings
def get_bert_embedding(text: str) -> np.ndarray:
    inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    return outputs.last_hidden_state[:, 0, :].numpy()  # CLS token embedding

@app.post("/recommend")
async def recommend(request: RecommendationRequest):
    try:
        # Create user profile text
        user = request.user
        quiz_text = f"Quiz: {user.quiz.course} with score {user.quiz.score}%" if user.quiz else "No quiz"
        user_text = f"Profession: {user.profession}, Preferences: {', '.join(user.preferences)}, {quiz_text}"

        # Get user embedding
        user_embedding = get_bert_embedding(user_text)

        # Get course embeddings
        course_embeddings = []
        course_ids = []
        for course in request.courses:
            course_text = f"Title: {course.title}, Description: {course.description}, Tags: {', '.join(course.tags)}, Profession: {', '.join(course.profession)}"
            embedding = get_bert_embedding(course_text)
            course_embeddings.append(embedding)
            course_ids.append(course.id)

        # Compute cosine similarity
        course_embeddings = np.vstack(course_embeddings)
        similarities = cosine_similarity(user_embedding, course_embeddings)[0]

        # Get top 5 courses
        top_indices = np.argsort(similarities)[-5:][::-1]
        top_course_ids = [course_ids[i] for i in top_indices]

        return {"recommendations": top_course_ids}
    except Exception as e:
        return {"error": str(e)}