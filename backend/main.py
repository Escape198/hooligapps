from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from backend.database import SessionLocal
from backend.repositories.sqlalchemy import SubmissionRepository
from backend.services import SubmissionService
from backend.schemas import SubmissionRequest


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_service(db: Session = Depends(get_db)):
    repo = SubmissionRepository(db)
    return SubmissionService(repo)


@app.post("/submit")
async def submit_form(
    payload: SubmissionRequest,
    service: SubmissionService = Depends(get_service)
):
    return await service.submit(payload)


@app.get("/history")
def get_history(
    service: SubmissionService = Depends(get_service)
):
    return service.get_history()
