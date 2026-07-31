from pydantic import computed_field
from pydantic_settings import BaseSettings, SettingsConfigDict
from sqlalchemy.engine import URL

class Settings(BaseSettings):
    # ---------------------------------------------------------
    # Application
    # ---------------------------------------------------------

    APP_NAME: str
    APP_DESCRIPTION: str
    APP_VERSION: str
    APP_ENV: str = "development"
    DEBUG: bool = False

    # ---------------------------------------------------------
    # Database
    # ---------------------------------------------------------

    DB_HOST: str
    DB_PORT: int
    DB_NAME: str
    DB_USER: str
    DB_PASSWORD: str

    # ---------------------------------------------------------
    # JWT
    # ---------------------------------------------------------

    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # ---------------------------------------------------------
    # SQLAlchemy Database URL
    # ---------------------------------------------------------
    @computed_field
    @property
    def DATABASE_URL(self) -> URL:
        return URL.create(
            drivername="mysql+pymysql",
            username=self.DB_USER,
            password=self.DB_PASSWORD,
            host=self.DB_HOST,
            port=self.DB_PORT,
            database=self.DB_NAME,
        )

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
        extra="ignore",
    )


settings = Settings()
