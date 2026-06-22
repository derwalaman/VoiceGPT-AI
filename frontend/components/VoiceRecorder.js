"use client";

import { useRef, useState } from "react";

export default function VoiceRecorder({ email }) {
const [recording, setRecording] = useState(false);
const [audioURL, setAudioURL] = useState("");
const [transcript, setTranscript] = useState("");
const [aiResponse, setAiResponse] = useState("");
const [audioResponse, setAudioResponse] = useState("");
const [loading, setLoading] = useState(false);

const mediaRecorderRef = useRef(null);
const audioChunksRef = useRef([]);

const startRecording = async () => {
    try {
        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

        const mediaRecorder =
            new MediaRecorder(stream);

        mediaRecorderRef.current =
            mediaRecorder;

        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(
                audioChunksRef.current,
                {
                    type: "audio/webm",
                }
            );

            const url =
                URL.createObjectURL(audioBlob);

            setAudioURL(url);

            await transcribeAudio(audioBlob);
        };

        mediaRecorder.start();
        setRecording(true);
    } catch (error) {
        console.error(error);
    }
};

const stopRecording = () => {
    if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
    }

    setRecording(false);
};

const transcribeAudio = async (audioBlob) => {
    const formData = new FormData();

    formData.append(
        "audio",
        audioBlob,
        "recording.webm"
    );

    formData.append(
        "email",
        email
    );

    try {
        setLoading(true);

        const response = await fetch(
            "http://localhost:8000/voice/ask",
            {
                method: "POST",
                body: formData,
            }
        );

        const data =
            await response.json();

        setTranscript(
            data.transcript
        );

        setAiResponse(
            data.response
        );

        setAudioResponse(
            data.audio_url
        );

    } catch (error) {
        console.error(error);
    } finally {
        setLoading(false);
    }
};

return (
    <div className="space-y-6">

        <div
            className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-br
            from-purple-500/10
            via-blue-500/10
            to-cyan-500/10
            p-8
            backdrop-blur-xl
        "
        >

            <div className="absolute inset-0 bg-white/[0.02]" />

            <div className="relative flex flex-col items-center text-center">

                <div
                    className="
                    w-24
                    h-24
                    rounded-full
                    bg-white/10
                    border
                    border-white/10
                    flex
                    items-center
                    justify-center
                    text-5xl
                    shadow-lg
                "
                >
                    🎙️
                </div>

                <h2 className="text-4xl font-bold mt-6">
                    VoiceGPT Assistant
                </h2>

                <p className="text-zinc-400 mt-3 max-w-xl">
                    Speak naturally and get intelligent
                    responses powered by Whisper,
                    Groq Llama 3.3 and Text-to-Speech.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                    <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-white/10
                        text-sm
                    "
                    >
                        Whisper STT
                    </span>

                    <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-white/10
                        text-sm
                    "
                    >
                        Groq Llama 3.3
                    </span>

                    <span
                        className="
                        px-4
                        py-2
                        rounded-full
                        bg-white/10
                        text-sm
                    "
                    >
                        gTTS
                    </span>

                </div>

                {!recording ? (

                    <button
                        onClick={startRecording}
                        className="
                        mt-8
                        px-8
                        py-4
                        rounded-2xl
                        font-semibold
                        bg-gradient-to-r
                        from-purple-600
                        to-blue-600
                        hover:scale-105
                        transition
                        shadow-lg
                    "
                    >
                        🎤 Start Recording
                    </button>

                ) : (

                    <button
                        onClick={stopRecording}
                        className="
                        mt-8
                        px-8
                        py-4
                        rounded-2xl
                        bg-red-500
                        font-semibold
                        animate-pulse
                    "
                    >
                        🔴 Recording...
                    </button>

                )}

            </div>

        </div>

        {loading && (

            <div
                className="
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/10
                p-6
            "
            >
                <h3 className="text-lg font-semibold">
                    ⚡ Processing Request
                </h3>

                <p className="text-zinc-400 mt-2">
                    Voice → Whisper → Groq → TTS
                </p>
            </div>

        )}

        {(transcript || aiResponse) && (

            <div
                className="
                rounded-3xl
                border
                border-white/10
                bg-white/5
                backdrop-blur-xl
                p-6
                space-y-5
            "
            >

                {transcript && (

                    <div className="flex justify-end">

                        <div
                            className="
                            max-w-[85%]
                            rounded-2xl
                            bg-blue-600
                            px-5
                            py-4
                        "
                        >
                            <p className="text-sm text-blue-100 mb-2">
                                You
                            </p>

                            <p>
                                {transcript}
                            </p>
                        </div>

                    </div>

                )}

                {aiResponse && (

                    <div className="flex justify-start">

                        <div
                            className="
                            max-w-[85%]
                            rounded-2xl
                            bg-white/10
                            px-5
                            py-4
                            border
                            border-white/10
                        "
                        >
                            <p className="text-sm text-purple-300 mb-2">
                                VoiceGPT
                            </p>

                            <p className="leading-7 text-zinc-200">
                                {aiResponse}
                            </p>
                        </div>

                    </div>

                )}

            </div>

        )}

        {audioURL && (

            <div
                className="
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-6
            "
            >
                <h3 className="text-lg font-semibold mb-4">
                    🎧 Your Recording
                </h3>

                <audio
                    controls
                    src={audioURL}
                    className="w-full"
                />
            </div>

        )}

        {audioResponse && (

            <div
                className="
                rounded-2xl
                border
                border-purple-500/20
                bg-gradient-to-br
                from-purple-500/10
                to-blue-500/10
                p-6
            "
            >
                <h3 className="text-lg font-semibold mb-4">
                    🔊 AI Voice Response
                </h3>

                <audio
                    controls
                    src={audioResponse}
                    className="w-full"
                />
            </div>

        )}

    </div>
);

}
