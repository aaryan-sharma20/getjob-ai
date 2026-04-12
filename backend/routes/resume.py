from fastapi import APIRouter, File, UploadFile
from services.resume_service import extract_text_from_pdf, extract_skills, calculate_resume_score
from services.job_service import recommend_jobs
from services.resume_service import get_resume_feedback


router = APIRouter()

@router.post("/upload-resume/")
async def upload_resume(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file)
    skills = extract_skills(text)
    jobs = recommend_jobs(skills)
    score, suggestions = calculate_resume_score(skills)
    try:
        feedback = get_resume_feedback(text)
    except Exception as e:
        print("AI Error:", e)
        feedback = "AI feedback not available"

    return {
        "skills": skills,
        "recommended_jobs": jobs,
        "score": len(skills) * 10 if skills else 0,  # ✅ dynamic score
        "filename": file.filename,
        "feedback": feedback
    }