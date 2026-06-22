from fastapi import APIRouter

from app.database import SessionLocal
from app.models.history import History
from app.models.user import User

router = APIRouter()


@router.get("/")
def get_history():

    db = SessionLocal()

    history = (
        db.query(History)
        .order_by(
            History.created_at.desc()
        )
        .all()
    )

    result = []

    for item in history:

        result.append({
            "id": item.id,
            "question": item.question,
            "answer": item.answer,
            "user_id": item.user_id,
            "created_at": item.created_at
        })

    return result

@router.get("/{email}")
def get_user_history(
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
        return []

    history = (
        db.query(History)
        .filter(
            History.user_id == user.id
        )
        .order_by(
            History.created_at.desc()
        )
        .all()
    )

    return history