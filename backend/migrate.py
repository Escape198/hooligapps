from backend.database import Base, engine
from backend import models


def run_migrations():
    Base.metadata.create_all(bind=engine)


if __name__ == "__main__":
    run_migrations()