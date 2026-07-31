from fastapi import FastAPI

from app.api.router import api_router
from app.core.config import settings

app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
)

app.include_router(api_router, prefix="/api/v1")

@app.get("/", tags=["System"])
def root():
    return {
        "application": "Store Management System",
        "version": "1.0.0",
        "status": "Running"
    }


@app.get("/health", tags=["System"])
def health():
    return {
        "status": "healthy"
    }
