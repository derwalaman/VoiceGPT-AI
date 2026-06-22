from app.database import SessionLocal

from app.models.history import History


def save_history(
    user_id,
    question,
    answer
):

    db = SessionLocal()

    history = History(
        user_id=user_id,
        question=question,
        answer=answer
    )

    db.add(history)

    db.commit()

    db.refresh(history)

    return history