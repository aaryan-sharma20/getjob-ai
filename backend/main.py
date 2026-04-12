from fastapi import FastAPI
from routes import resume
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="GETJOB AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for now
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume.router)

@app.get("/")
def home():
    return {"message": "GETJOB AI Backend Running 🚀"}  