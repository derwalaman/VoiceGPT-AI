import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database import Base
from app.database import engine

from app.models.user import User
from app.models.history import History

from app.routes.user import router as user_router
from app.routes.voice import router as voice_router
from app.routes.history import router as history_router

os.makedirs(
    "uploads",
    exist_ok=True
)

os.makedirs(
    "generated_audio",
    exist_ok=True
)

from fastapi.staticfiles import StaticFiles

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount(
    "/audio",
    StaticFiles(
        directory="generated_audio"
    ),
    name="audio"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)

app.include_router(
    voice_router,
    prefix="/voice",
    tags=["Voice"]
)

app.include_router(
    history_router,
    prefix="/history",
    tags=["History"]
)

@app.get("/")
def home():
    return {
        "message":"VoiceGPT Backend Running"
    }