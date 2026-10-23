from fastapi import FastAPI

from app.routes.map import router as map_router

app = FastAPI(
    title="Disaster Response - Mapping Service",
    description="Microservice responsible for mapping incident coordinates and emergency safe zones.",
    version="1.0.0",
)

app.include_router(map_router)
