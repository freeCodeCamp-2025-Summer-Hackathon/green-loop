from fastapi.security import OAuth2PasswordRequestForm
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
        status_code=status.HTTP_201_CREATED,
        response_model=schemas.BaseResponse

        )
async def register( 
        userDto: schemas.UserCreate, 
        db_session: Session = Depends(get_db_session), 
        ):
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
        
    return {"detail": "User created successfully"}




#login endpoint
@router.post('/token', summary="Get access token", response_model=schemas.AccessTokenResponse, status_code=status.HTTP_200_OK)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db_session: Session = Depends(get_db_session),
):
    # form_data.username and form_data.password are the input
    db_user_obj = db_session.exec(
        select(User).where(User.email == form_data.username)  # usually username is email
    ).first()

    if not db_user_obj or not db_user_obj.verify_password(form_data.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    access_token = await auth.create_access_token(db_user_obj)
    refresh_token = await auth.create_refresh_token(db_user_obj)

    return schemas.AccessTokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
    )


#Get new access token based on refreshed token 
@router.post("/refresh_token", response_model=schemas.AccessTokenResponse, summary='Get Refresh Users')
async def refresh_access_token(
    refresh_token: schemas.RefreshTokenRequest, 
    db: Session = Depends(get_db_session)
):
    user = auth.verify_token(refresh_token, db, is_refresh=True)
    access_token = await auth.create_access_token(user)
    return schemas.AccessTokenResponse(
        access_token=access_token,
        refresh_token=refresh_token
    )

@router.get('/user/me', response_model=schemas.UserBase, summary='Get current authenticated user')
async def get_current_user_info(
    current_user: User = Depends(auth.authenticate_user)
):
    return current_user