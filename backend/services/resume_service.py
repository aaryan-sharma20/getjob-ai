from PyPDF2 import PdfReader

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