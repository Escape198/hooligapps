from sqlalchemy.orm import Session
from datetime import date
from backend.models import Submission
from backend.repositories.interfaces import SubmissionRepositoryProtocol


class SubmissionRepository(SubmissionRepositoryProtocol):
    def __init__(self, db: Session):
        self.db = db

    def add_submission(self, submission: Submission) -> None:
        self.db.add(submission)

    def save_submission(self, date: date, first_name: str, last_name: str) -> Submission:
        submission = Submission(
            date=date,
            first_name=first_name,
            last_name=last_name
        )
        self.db.add(submission)
        self.db.commit()
        self.db.refresh(submission)
        return submission

    def get_history(self, limit: int = 10) -> list[Submission]:
        return (
            self.db.query(Submission)
            .order_by(Submission.date.desc(), Submission.first_name, Submission.last_name)
            .limit(limit)
            .all()
        )

    def count_previous(self, date: date, first_name: str, last_name: str) -> int:
        return (
            self.db.query(Submission)
            .filter(
                Submission.first_name == first_name,
                Submission.last_name == last_name,
                Submission.date < date
            )
            .count()
        )