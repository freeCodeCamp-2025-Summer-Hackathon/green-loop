from typing import Union
from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router

app = FastAPI()
router = APIRouter()

@app.get("/")
async def root():
    return {"Message": "Welcome to CollabLearn API"}


allowed_origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=allowed_origins,
    allow_credentials=True, 
    allow_methods=['*'], 
    allow_headers=['*']
)

app.include_router(users_router, prefix="/api", tags=["user"])


