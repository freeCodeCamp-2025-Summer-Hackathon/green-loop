from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from jose.exceptions import JWTError
from sqlmodel import Session, select
from database import get_db_session
from config import settings
from models import User
import datetime as dt
import models
import schemas


SECRET_KEY = settings.SECRET_KEY
ALGORITHM = settings.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = settings.ACCESS_TOKEN_EXPIRE_MINUTES
REFRESH_TOKEN_EXPIRE = settings.REFRESH_TOKEN_EXPIRE

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")

async def create_access_token(userObj: models.User):
    """Create an access token for the user."""
    user_obj = schemas.UserPayLoadJwt.model_validate(userObj)
    user_obj_dict_to_encode = user_obj.model_dump()
    access_token_expire = datetime.now(dt.UTC) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    user_obj_dict_to_encode["exp"] = access_token_expire

    return jwt.encode(user_obj_dict_to_encode, SECRET_KEY, algorithm=ALGORITHM) 


async def create_refresh_token(userObj: models.User):
    """Create a refresh token for the user."""
    user_obj = schemas.UserPayLoadJwt.model_validate(userObj)
    user_obj_dict_to_encode = user_obj.model_dump()
    refresh_token_expire = datetime.now(dt.UTC) + timedelta(minutes=REFRESH_TOKEN_EXPIRE)
    user_obj_dict_to_encode["exp"] = refresh_token_expire

    return jwt.encode(user_obj_dict_to_encode, settings.REFRESH_SECRET_KEY, algorithm=ALGORITHM)


async def create_tokens_and_refresh_tokens(userObj: models.User):
    """Create both access and refresh tokens for the user."""
    access_token = create_access_token(userObj)
    refresh_token = create_refresh_token(userObj)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }



def verify_token(token: str, db: Session, is_refresh: bool = False) -> User:
    try:
        secret = settings.REFRESH_SECRET_KEY if is_refresh else SECRET_KEY
        payload = jwt.decode(token, secret, algorithms=[ALGORITHM])

        user_id  = payload.get("id")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid Token")

        user = db.exec(select(User).where(User.id == user_id)).first()
        if not user:
            raise HTTPException(status_code=401, detail="User not found")

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )




def authenticate_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db_session)
) -> User:
    return verify_token(token, db, is_refresh=True)