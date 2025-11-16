from fastapi import FastAPI

app = FastAPI(title="Nexus Edge Systems API")

@app.get("/health")
async def health():
    return {"status": "ok"}
from fastapi import FastAPI

app = FastAPI(title="Nexus Edge Systems API")

@app.get("/health")
async def health():
    return {"status": "ok"}
