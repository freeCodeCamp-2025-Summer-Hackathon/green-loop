from typing import Union
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router

app = FastAPI()
router = APIRouter()

@app.get("/")
async def root():
    return {"Message": "Welcome to CollabLearn API"}

app.include_router(users_router, prefix="/api", tags=["user"])


