from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form

from app.services.whisper_service import (
    transcribe_audio
)

from app.services.groq_service import (
    ask_llm
)

from app.services.tts_service import (
    text_to_speech
)

from app.services.history_service import (
    save_history
)

from app.database import SessionLocal

from app.models.user import User

import os
import uuid

router = APIRouter()


@router.post("/transcribe")
async def transcribe(
    audio: UploadFile = File(...)
):

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    unique_file = (
        f"{uuid.uuid4()}.webm"
    )

    file_path = (
        f"uploads/{unique_file}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await audio.read()
        )

    text = transcribe_audio(
        file_path
    )

    if os.path.exists(
        file_path
    ):
        os.remove(
            file_path
        )

    return {
        "text": text
    }


@router.post("/upload")
async def upload_audio(
    audio: UploadFile = File(...)
):

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    unique_file = (
        f"{uuid.uuid4()}.webm"
    )

    file_path = (
        f"uploads/{unique_file}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await audio.read()
        )

    return {
        "message": "Audio uploaded",
        "file": file_path
    }


@router.get("/test-llm")
def test_llm():

    answer = ask_llm(
        "What is machine learning?"
    )

    return {
        "response": answer
    }


@router.post("/ask")
async def ask_voice(
    audio: UploadFile = File(...),
    email: str = Form(...)
):

    os.makedirs(
        "uploads",
        exist_ok=True
    )

    os.makedirs(
        "generated_audio",
        exist_ok=True
    )

    unique_file = (
        f"{uuid.uuid4()}.webm"
    )

    file_path = (
        f"uploads/{unique_file}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await audio.read()
        )

    transcript = (
        transcribe_audio(
            file_path
        )
    )

    if os.path.exists(
        file_path
    ):
        os.remove(
            file_path
        )

    response = (
        ask_llm(
            transcript
        )
    )

    db = SessionLocal()

    try:

        user = (
            db.query(User)
            .filter(
                User.email == email
            )
            .first()
        )

        if user:

            save_history(
                user.id,
                transcript,
                response
            )

    finally:

        db.close()

    audio_filename = (
        text_to_speech(
            response
        )
    )

    return {

        "transcript":
        transcript,

        "response":
        response,

        "audio_url":
        f"http://localhost:8000/audio/{audio_filename}"

    }