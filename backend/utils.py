import re
import unicodedata
import fastapi
import schemas
import email_validator as _email_checker
import passlib.hash as _hash
import hashlib
from requests import Session
from datetime import datetime, timezone
from secrets import token_urlsafe





def slugify(text: str) -> str:
    """
    Convert a string to a URL-friendly slug.
    """
    # Normalize the text to remove accents and special characters
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8')
    
    # Convert to lowercase
    text = text.lower()
    
    # Replace spaces and non-alphanumeric characters with hyphens
    text = re.sub(r'[\s\W-]+', '-', text).strip('-')
    
    return text

async def create_user(user:schemas.UserCreate, db_session:Session = fastapi.Depends()):
    from models import User
    try:
        valid_email = _email_checker.validate_email(user.email)
        email = valid_email.email
    except _email_checker.EmailNotValidError:
        raise fastapi.HTTPException(
            status_code=404, 
            detail="Invalid Email Credentials"
        )

    # Check if password is provided
    if not user.password and user.password is None:
        raise fastapi.HTTPException(
            status_code=400,
            detail="Password is required."
        )

    #if everything is working fine create the user in the database,
    password_hashed = _hash.bcrypt.hash(user.password)



    # Create user object
    user_obj = User(
        email=user.email, 
        username=user.username, 
        password_hash=password_hashed, 
        college_name=user.college_name,    
        major=user.major,
        college_year=user.college_year,
        profile_picture_url=user.profile_picture_url,
        bio=user.bio,
        is_verified=False,
        last_login_at=datetime.now(timezone.utc),
        is_active=True,
        created_at=datetime.now(timezone.utc)
    )
    # Persit to databaze
    db_session.add(user_obj)
    db_session.commit()
    db_session.refresh(user_obj)
    
    #save to db
    
    
    return user_obj


def generate_access_code(is_private)-> str | None:
        if is_private:
            return token_urlsafe(8)[:5]  # ~10 characters long
        else:
            return None


def hash_private_code(s: str) -> str:
    return hashlib.sha256(s.encode('utf-8')).hexdigest()