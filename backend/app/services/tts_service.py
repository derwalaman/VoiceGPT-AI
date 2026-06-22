import os
import uuid

from gtts import gTTS


def text_to_speech(text):

    os.makedirs(
        "generated_audio",
        exist_ok=True
    )

    filename = (
        f"{uuid.uuid4()}.mp3"
    )

    file_path = (
        f"generated_audio/{filename}"
    )

    tts = gTTS(
        text=text,
        lang="en"
    )

    tts.save(
        file_path
    )

    return filename