from sqlmodel import SQLModel, Field, create_engine, Session
from models import *

DATABASE_URL = "sqlite:///./study_platform.db"
engine = create_engine(
    DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False}
)

def initialize_db():
    # Create all tables in the database
    SQLModel.metadata.create_all(engine)

def get_db_session():
    with Session(engine) as session:
        yield session

if __name__ == "__main__":
    initialize_db()
    print("Database initialized successfully.")
