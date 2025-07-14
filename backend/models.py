from sqlalchemy import Column, Integer, String, Date
from backend.database import Base


class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, index=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)