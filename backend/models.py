import secrets
from typing import List, Optional
from datetime import datetime
import datetime as dt
from sqlmodel import Field, SQLModel, Relationship
from utils import slugify
from passlib.hash import bcrypt
from secrets import token_urlsafe


class User(SQLModel, table=True):
    __tablename__ = "users"
    id: int = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, max_length=50)
    email: str = Field(unique=True, max_length=100)
    password_hash: str
    college_name: str  = Field(max_length=100)
    major: str = Field(max_length=100)
    college_year: int = Field(default=None, ge=1, le=4)
    profile_picture_url: str | None = None
    bio: str = Field(default="Hey There! I'm using Ensemble.", max_length=250)
    created_at: datetime

    #once user creates an account, send verification email
    is_verified: bool = Field(default=False)
    last_login_at: datetime
    is_active: bool = Field(default=True)


    threads: List["Thread"] = Relationship(back_populates="user")
    thread_comments: List["ThreadComment"] = Relationship(back_populates="user")

    # Relationships
    # groups the user owns
    owned_groups: List["Group"] = Relationship(back_populates="owner")

    # groups the user is part of
    group_links: List["GroupUser"] = Relationship(back_populates="user")

   
    def verify_password(self, plain_password: str) -> bool:
        return bcrypt.verify(plain_password, self.password_hash)
    
    @staticmethod
    def hash_password(plain_password: str) -> str:
        return bcrypt.hash(plain_password)
    

class Group(SQLModel, table=True):
    __tablename__ = "groups"
    id: int  = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, max_length=100)
    slug: str = Field(index=True, unique=True, max_length=100)
    description: str | None = Field(default='', max_length=500)
    tags: str | None = None
    owner_id: int = Field(foreign_key="users.id")
    created_at: datetime
    updated_at: datetime


    # Relationships

    # The user who owns the group
    owner: User  = Relationship(back_populates="owned_groups")
    
    is_private: bool = Field(default=True)
    access_code: int | None

    # Threads in the group
    threads: List["Thread"] = Relationship(back_populates="group")

    # Users in the group
    # This is a many-to-many relationship through the GroupUser model
    # Each GroupUser instance represents a user in a group with a specific role
    group_users: List["GroupUser"] = Relationship(back_populates="group")


    def generate_access_code(self)-> str:
        return token_urlsafe(8)[:10]  # ~10 characters long
        

    def __init__(self, **data):
        super().__init__(**data)
        if not self.slug and self.name:
            self.slug = slugify(self.name)
        # Generate access code if group is private
        if  self.is_private:
            self.access_code = self.generate_access_code()
    





class GroupUser(SQLModel, table=True):
    __tablename__ = "group_user"
    user_id: int = Field(foreign_key="users.id", primary_key=True)
    group_id: int = Field(foreign_key="groups.id", primary_key=True)
    role: str = Field(default="member", max_length=20)
    joined_at: datetime

    user: User | None = Relationship(back_populates="group_links")
    group: Group | None = Relationship(back_populates="group_users")

  

class Thread(SQLModel, table=True):
    __tablename__ = "threads"
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=150)
    content: str
    is_resolved: bool = Field(default=False)
    group_id: int = Field(foreign_key="groups.id")
    group_slug: str 
    user_id: int = Field(foreign_key="users.id")
    created_at: datetime = Field(default=datetime.now(dt.UTC))
    updated_at: datetime = Field(default=datetime.now(dt.UTC))
    pinned: bool = Field(default=False)
    locked: bool = Field(default=False)

    group: Group | None = Relationship(back_populates="threads")
    user: User | None = Relationship(back_populates="threads")
    thread_comments: List["ThreadComment"] = Relationship(back_populates="thread")

class ThreadComment(SQLModel, table=True):
    __tablename__ = "thread_comments"
    id: int | None = Field(default=None, primary_key=True)
    content: str
    user_id: int = Field(foreign_key="users.id")
    thread_id: int = Field(foreign_key="threads.id")
    created_at: datetime = Field(default=datetime.now(dt.UTC))
    updated_at: datetime = Field(default=datetime.now(dt.UTC))
    user: User | None = Relationship(back_populates="thread_comments")
    thread: Thread | None = Relationship(back_populates="thread_comments")