from pydantic import BaseModel, Field

# Represents GPS Geographic Coordinates
class Coordinates(BaseModel):
    latitude: float = Field(..., ge=-90.0, le=90.0, description="Latitude between -90 and 90")
    longitude: float = Field(..., ge=-180.0, le=180.0, description="Longitude between -180 and 180")

# Request schema for reporting a new disaster location
class IncidentCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=100)
    incident_type: str = Field(..., description="e.g. FLOOD, WILDFIRE, EARTHQUAKE")
    severity: str = Field(default="MEDIUM", description="LOW, MEDIUM, HIGH, CRITICAL")
    location: Coordinates

# Response schema returned to the client
class IncidentResponse(BaseModel):
    id: str
    title: str
    incident_type: str
    severity: str
    location: Coordinates
    created_at: str

# Health check response schema
class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str
