import os

from fastapi import FastAPI
import uvicorn

from app.routes.map import router as map_router

app = FastAPI(
    title="Disaster Response - Mapping Service",
    description="Microservice responsible for mapping incident coordinates and emergency safe zones.",
    version="1.0.0",
)

app.include_router(map_router)

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    print(f"[MAPPING-SERVICE] Starting on http://{host}:{port}")
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
