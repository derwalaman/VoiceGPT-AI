from fastapi import APIRouter
from pydantic import BaseModel

from app.database import SessionLocal
from app.models.user import User

router = APIRouter()


class UserCreate(BaseModel):

    email:str

    name:str

    image:str


@router.post("/create")
def create_user(user:UserCreate):

    db = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:

        return {
            "message":"User already exists",
            "user_id":existing_user.id
        }

    new_user = User(
        email=user.email,
        name=user.name,
        image=user.image
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message":"User created",
        "user_id":new_user.id
    }

@router.get("/email/{email}")
def get_user_by_email(
    email: str
):

    db = SessionLocal()

    user = (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )

    if not user:

        return {
            "error":
            "User not found"
        }

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }