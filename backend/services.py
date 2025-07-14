import asyncio
import random
from sqlalchemy.orm import Session

from backend.schemas import (
    SubmissionRequest, SubmissionResponse,
    SubmissionResponseItem, HistoryItem
)
from backend.models import Submission
from backend.repositories.interfaces import SubmissionRepositoryProtocol


class SubmissionService:
    def __init__(self, repo: SubmissionRepositoryProtocol, db: Session):
        self.repo = repo
        self.db = db

    async def submit(self, request: SubmissionRequest) -> SubmissionResponse:
        submission = Submission(
            date=request.date,
            first_name=request.first_name,
            last_name=request.last_name
        )
        self.repo.add_submission(submission)
        self.db.commit()
        self.db.refresh(submission)

    def get_history(self) -> list[HistoryItem]:
        submissions = self.repo.get_history()
        result = []
        for s in submissions:
            count = self.repo.count_previous(
                s.date, s.first_name, s.last_name
            )
            result.append(HistoryItem(
                date=s.date,
                first_name=s.first_name,
                last_name=s.last_name,
                count=count
            ))
        return result
