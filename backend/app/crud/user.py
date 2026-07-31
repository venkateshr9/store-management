from datetime import UTC, datetime
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_user_by_employee_no(db: Session, employee_no: str):
    return (
        db.query(User)
        .filter(User.employee_no == employee_no)
        .first()
    )

def get_user_by_email(db: Session, email: str):
    return (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

def get_users(
    db: Session,
    skip: int = 0,
    limit: int = 100,
):
    return (
        db.query(User)
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_user(
    db: Session,
    user: UserCreate,
):
    if get_user_by_username(db, user.username):
        raise ValueError("Username already exists")

    if get_user_by_employee_no(db, user.employee_no):
        raise ValueError("Employee number already exists")

    if user.email and get_user_by_email(db, user.email):
        raise ValueError("Email already exists")

    db_user = User(
        employee_no=user.employee_no,
        username=user.username,
        full_name=user.full_name,
        email=user.email,
        mobile=user.mobile,
        password_hash=hash_password(user.password),
        is_active=user.is_active,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user

def update_user(
    db: Session,
    db_user: User,
    user: UserUpdate,
):
    update_data = user.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(db_user, key, value)

    db.commit()
    db.refresh(db_user)

    return db_user

def update_last_login(
    db: Session,
    db_user: User,
):
    db_user.last_login = datetime.now(UTC)

    db.commit()
    db.refresh(db_user)

    return db_user

def delete_user(
    db: Session,
    db_user: User,
):
    db.delete(db_user)
    db.commit()
