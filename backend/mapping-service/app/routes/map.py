import uuid
from datetime import UTC, datetime

from fastapi import APIRouter, status

from app.schemas.map import HealthResponse, IncidentCreate, IncidentResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse, tags=["Health"])
async def get_health():
    return HealthResponse(status="OK", service="mapping-service", timestamp=datetime.now(UTC).isoformat())


@router.post("/incidents", response_model=IncidentResponse, status_code=status.HTTP_201_CREATED, tags=["Incidents"])
async def create_incident(payload: IncidentCreate):
    incident_id = f"inc-{uuid.uuid4().hex[:8]}"

    print(f"[INCIDENT LOGGED] {payload.title} ({payload.incident_type}) at [{payload.location.latitude}, {payload.location.longitude}]")

    return IncidentResponse(
        id=incident_id,
        title=payload.title,
        incident_type=payload.incident_type,
        severity=payload.severity,
        location=payload.location,
        created_at=datetime.now(UTC).isoformat()
    )
