from PyPDF2 import PdfReader
import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SKILLS_DB = [
    "python", "java", "c++", "machine learning", "deep learning",
    "data analysis", "sql", "excel", "pandas", "numpy",
    "communication", "teamwork", "problem solving"
]

def extract_text_from_pdf(file):
    reader = PdfReader(file.file)
    text = ""

    for page in reader.pages:
        text += page.extract_text() or ""

    return text.lower()


def extract_skills(text):
    found_skills = []

    for skill in SKILLS_DB:
        if skill in text:
            found_skills.append(skill)

    return found_skills

def calculate_resume_score(skills):
    score = 0
    suggestions = []

    # Skill-based scoring
    score += len(skills) * 10

    # Cap score
    if score > 100:
        score = 100

    # Suggestions
    if len(skills) < 5:
        suggestions.append("Add more relevant skills to your resume")

    if "sql" not in skills:
        suggestions.append("Consider adding SQL skills")

    if "projects" not in skills:
        suggestions.append("Add projects section to your resume")

    return score, suggestions

def get_resume_feedback(text):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": f"""
Analyze this resume and provide:

1. Strengths
2. Weaknesses
3. Suggestions for improvement

Resume:
{text}
"""
                }
            ]
        )

        return response.choices[0].message.content

    except Exception as e:
        print("AI Error:", e)
        return "AI feedback not available"