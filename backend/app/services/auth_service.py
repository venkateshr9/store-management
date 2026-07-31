from sqlalchemy.orm import Session

from app.core.security import create_access_token, verify_password
from app.crud.user import (
    get_user_by_username,
    update_last_login,
)
from app.models.user import User


def authenticate_user(
    db: Session,
    username: str,
    password: str,
) -> User | None:

    user = get_user_by_username(db, username)

    if not user:
        return None

    if not verify_password(password, user.password_hash):
        return None

    if not user.is_active:
        return None

    update_last_login(db, user)

    return user


def login_user(
    db: Session,
    username: str,
    password: str,
) -> str | None:

    user = authenticate_user(db, username, password)

    if not user:
        return None

    return create_access_token(subject=str(user.id))
