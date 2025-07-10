import schemas
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from models import User
from database import get_db_session
import utils
import auth


router = APIRouter()

@router.post(
        "/create_new_user", 
        summary="Create a new user", 
 
        status_code=status.HTTP_201_CREATED)
async def register( userDto: schemas.UserCreate, db_session: Session = Depends(get_db_session)):
    """  Register a new user"""
    # Check if user already exists
    db_user_email = db_session.exec(
        select(User).where(User.email == userDto.email)
    ).first()

    db_user_username = db_session.exec(
        select(User).where(User.username == userDto.username)
    ).first()
    if db_user_email is not None:
        raise HTTPException(status_code=400, detail="Email already registered")
    if db_user_username is not None:
        raise HTTPException(status_code=400, detail="Username already registered")

    new_user = await utils.create_user(userDto, db_session)
    if not new_user:
        raise HTTPException(status_code=500, detail="User creation failed")
    # Create access token for the new user
    access_token = await auth.create_access_token(new_user)
    
    return {"detail": "User created successfully"}




#login endpoint
@router.post('/token', summary="Get access token", response_model=schemas.AccessTokenResponse, status_code=status.HTTP_200_OK)
async def login(user: schemas.UserLogin, db_session: Session = Depends(get_db_session)):
    """  Login user and return access token"""

    # Check if user exists based on email
    db_user_obj = db_session.exec(
        select(User).where(User.email == user.email)
    ).first()

    if not db_user_obj:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    if not db_user_obj.verify_password(user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = await auth.create_access_token(db_user_obj)
    refresh_token = await auth.create_refresh_token(db_user_obj)

    return schemas.AccessTokenResponse(
        access_token=access_token,
        refresh_token=refresh_token)