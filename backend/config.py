from pydantic_settings import BaseSettings



class Settings(BaseSettings):
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 2
    # Add refresh token settings if needed
    REFRESH_TOKEN_EXPIRE: int = 60 * 24 * 7  # 7 days
    REFRESH_SECRET_KEY: str 

    class Config:
        env_file = ".env"

settings = Settings()
