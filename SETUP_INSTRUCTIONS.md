# Setup Instructions

This file summarizes the quick steps to get the project running locally and deploy the frontend to Vercel.

- Ensure Node >= 18 and npm >= 9
- Ensure Python 3.11 for backend
- Run frontend: `cd frontend && npm install && npm run dev`
- Run backend: `cd backend && python -m venv venv && venv\Scripts\activate && pip install -r requirements.txt && uvicorn app.main:app --reload`
