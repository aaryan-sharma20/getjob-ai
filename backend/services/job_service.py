def recommend_jobs(skills):
    jobs = []

    # Simple rule-based system
    if "machine learning" in skills or "deep learning" in skills:
        jobs.append("ML Engineer")
        jobs.append("Data Scientist")

    if "python" in skills:
        jobs.append("Backend Developer")

    if "sql" in skills or "data analysis" in skills:
        jobs.append("Data Analyst")

    if "java" in skills:
        jobs.append("Software Engineer")

    if "communication" in skills:
        jobs.append("Project Manager")

    # Remove duplicates
    return list(set(jobs))