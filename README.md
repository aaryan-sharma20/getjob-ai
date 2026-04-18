# 🚀 GetJobs AI – Resume Analyzer & Job Recommendation Platform

An AI-powered full-stack web application that analyzes resumes and recommends real-time job opportunities based on extracted skills.

---

## 📌 Overview

GetJobs AI allows users to upload their resume and instantly receive:

- 📄 Extracted skills
- 📊 Resume score
- 🧠 AI-based feedback
- 💼 Real-time job recommendations

This project demonstrates real-world full-stack development using modern technologies and APIs.

---

## ✨ Features

- 📄 Upload Resume (PDF)
- 🔍 Automatic Skill Extraction
- 📊 Resume Scoring System
- 🤖 AI Feedback (OpenAI API)
- 💼 Real-Time Job Recommendations (Adzuna API)
- 🎯 Smart Matching based on skills
- 🎨 Clean Dashboard UI

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- FastAPI (Python)
- Uvicorn

### APIs Used
- OpenAI API → Resume feedback
- Adzuna API → Job listings

---

## ⚙️ Project Structure
Get-jobs-AI/
│
├── backend/
│ ├── routes/
│ │ └── resume.py
│ ├── services/
│ │ ├── resume_service.py
│ │ └── job_service.py
│ ├── main.py
│ └── requirements.txt
│
├── frontend/
│ └── src/
│ └── App.jsx
│
└── README.md


---

## 🚀 How It Works

1. Upload your resume (PDF)
2. Extract text using PyPDF2
3. Identify skills
4. Calculate resume score
5. Generate AI feedback
6. Fetch real-time jobs
7. Display results in UI

---

## 🌍 Live Demo

🔗 https://https://getjob-ai-backend-1uka.onrender.com/

🔗 https://getjob-ai.vercel.app/

---

## 🧪 Run Locally

### Clone Repository

```bash
git clone https://github.com/aaryan-sharma20/Get-jobs-AI.git
cd Get-jobs-AI
```

## Backend setup
- cd backend
- python -m venv venv
- venv\Scripts\activate
- pip install -r requirements.txt
- uvicorn main:app --reload

## Frontend setup
- cd frontend
- npm install
- npm run dev

## Enviornment variables
- OPENAI_API_KEY=your_key_here
- ADZUNA_APP_ID=your_id_here
- ADZUNA_APP_KEY=your_key_here

## Challenges Faced
- API integration errors (400, JSON issues)
- Deployment issues (missing dependencies)
- Environment variable handling
- Real-time API debugging
- Fallback handling for failed APIs

## Future improvements
- Job filters (location, salary)
- User authentication
- Resume history tracking
- Better UI animations
- Mobile optimization

## Learning Outcomes
- Full-stack development (React + FastAPI)
- API integration
- Deployment on Render
- Debugging real-world problems
- Handling production-level issues

## Author
Aaryan Sharma

- 🎓 B.Tech CSE (AI & ML)
- 💡 Interested in AI, Web Development & Real-world projects


---
