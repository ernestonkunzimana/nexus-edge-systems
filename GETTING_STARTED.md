# Getting Started

1. Clone the repo
   git clone git@github.com:ernestonkunzimana/nexus-edge-systems.git

2. Frontend
   cd nexus-edge-systems/frontend
   npm install
   npm run dev

3. Backend
   cd ../backend
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
