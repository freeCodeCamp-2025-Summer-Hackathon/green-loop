import datetime
from typing import Union
from pydantic import BaseModel, EmailStr
from pyparsing import Optional
from sqlmodel import Field



class AccessTokenResponse(BaseModel):
    access_token: str
    refresh_token: str
class UserBase(BaseModel):
    username: str = Field(max_length=50)
    email: str = Field(max_length=100)
    college_name: str  = Field(max_length=100)
    major: str = Field(max_length=100)
    college_year: int | None = Field(default=None, ge=1, le=4)
    profile_picture_url: str | None = None
    bio: str = Field(default="Hey There! I'm using Ensemble.", max_length=250)


class UserPayLoadJwt(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_verified: bool
    profile_picture_url: str | None = None
    exp: Union[datetime.datetime, None] = None  # this is used for token expiration (JWT standard claim)

    model_config = { 
        'from_attributes': True,
    }


class UserLogin(BaseModel):
    email: EmailStr
    password: str



class UserCreate(UserBase):
    password: str


class BaseResponse (BaseModel):
    detail : str