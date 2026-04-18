import requests
import os
import random
from dotenv import load_dotenv

load_dotenv()

APP_ID = os.getenv("ADZUNA_APP_ID")
APP_KEY = os.getenv("ADZUNA_APP_KEY")


def get_real_jobs(skills):
    query = " OR ".join(skills[:3])

    url = "https://api.adzuna.com/v1/api/jobs/in/search/1"

    params = {
        "app_id": APP_ID,
        "app_key": APP_KEY,
        "what": query,
        "results_per_page": 6
    }

    response = requests.get(url, params=params, timeout=5)

    if response.status_code != 200:
        print("API ERROR:", response.status_code, response.text)
        return []

    try:
        data = response.json()
    except Exception as e:
        print("JSON ERROR:", e)
        print("RAW RESPONSE:", response.text)
        return []

    # fallback if empty
    if not data.get("results"):
        params["what"] = "software developer"
        response = requests.get(url, params=params)
        data = response.json()

    results = data.get("results", [])
    random.shuffle(results)

    jobs = []

    for job in results[:5]:
        jobs.append({
            "title": job.get("title"),
            "company": job.get("company", {}).get("display_name"),
            "location": job.get("location", {}).get("display_name"),
            "url": job.get("redirect_url")
        })

    return jobs