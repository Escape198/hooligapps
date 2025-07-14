from pydantic import BaseModel, field_validator
from datetime import date


class SubmissionRequest(BaseModel):
    date: date
    first_name: str
    last_name: str

    @field_validator("first_name", "last_name")
    @classmethod
    def no_whitespace(cls, v, info):
        if " " in v:
            raise ValueError(f"No whitespace in {info.field_name} is allowed")
        return v


class SubmissionResponseItem(BaseModel):
    date: date
    name: str


class SubmissionResponse(BaseModel):
    success: bool
    data: list[SubmissionResponseItem]


class HistoryItem(BaseModel):
    date: date
    first_name: str
    last_name: str
    count: int
