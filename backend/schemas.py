import datetime
from typing import List, Union
from pydantic import BaseModel, EmailStr
from pyparsing import Optional
from sqlmodel import Field



class AccessTokenResponse(BaseModel):
    access_token: str
    refresh_token: str


class RefreshTokenRequest(BaseModel):
    refresh_token: str

class GroupCreate(BaseModel):
    name: str
    description : str
    tags: str | None = None
    is_private: bool | None = False


class ThreadBase(BaseModel):
    
    pinned :bool = False
    locked : bool = False


class ThreadCreate(ThreadBase):
    title : str =Field(max_length=150)
    content : str
    group_slug : str



class ThreadCommentCreate(BaseModel):
    thread_id: int
    content: str



class ThreadCommentRead(BaseModel):
    id: int
    content: str
    user_id: int
    username:str
    thread_id: int
    created_at: datetime.datetime
    updated_at: datetime.datetime

    model_config = { 
        'from_attributes': True,
    }

class ThreadResponse(BaseModel):
    id: int
    title: str
    content: str
    group_id: int
    user_id: int
    pinned: bool 
    locked: bool
    created_at: datetime.datetime
    updated_at: datetime.datetime
    thread_comments: List[ThreadCommentRead]

    model_config = { 
        'from_attributes': True,
    }



class UserBase(BaseModel):
    username: str = Field(max_length=50)
    email: str = Field(max_length=100)
    college_name: str  = Field(max_length=100)
    major: str = Field(max_length=100)
    college_year: int | None = Field(default=None, ge=1, le=4)
    profile_picture_url: str | None = None
    bio: str = Field(default="Hey There! I'm using Ensemble.", max_length=250)

class GroupInfo(BaseModel):
    name: str
    slug: str
    description: str | None = None
    tags: str | None = None
    owner_username: str
    owner_email: str
    created_at: datetime.datetime
    updated_at: datetime.datetime
    total_members: int
    visibility: str  # "public" or "private"


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