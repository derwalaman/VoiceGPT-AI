# 🎙️ VoiceGPT AI

An AI-powered voice assistant built using **Next.js**, **FastAPI**, **OpenAI Whisper**, **Groq Llama 3.3**, **Google OAuth**, and **PostgreSQL (Neon)**.

Users can authenticate with Google, speak naturally through their microphone, convert speech to text using Whisper, generate AI responses using Groq Llama, convert responses back into speech using gTTS, and store conversation history in PostgreSQL.

---

# 🚀 Features

## Authentication

* Google OAuth Login
* NextAuth.js Authentication
* Secure Session Management
* Protected Dashboard Routes

## Speech Recognition

* Audio Recording via Browser
* OpenAI Whisper Integration
* Speech-to-Text Conversion

## AI Responses

* Groq API Integration
* Llama 3.3 Model
* Fast AI Response Generation

## Text-to-Speech

* gTTS Integration
* AI Responses Converted to Audio
* Play AI Voice Directly in Browser

## Database

* PostgreSQL Database (Neon)
* User Storage
* Conversation History Storage

## UI

* Modern Responsive Dashboard
* Dark Theme
* Glassmorphism Components
* Mobile Friendly Design

## DevOps

* Dockerized Frontend
* Dockerized Backend
* Docker Compose Support
* Environment Variable Management

---

# 🏗️ Architecture

```text
User Voice
     │
     ▼
Browser Recording
     │
     ▼
FastAPI Backend
     │
     ▼
OpenAI Whisper
     │
     ▼
Transcript
     │
     ▼
Groq Llama 3.3
     │
     ▼
AI Response
     │
     ▼
gTTS
     │
     ▼
Generated MP3
     │
     ▼
Frontend Playback
```

---

# 🛠️ Tech Stack

## Frontend

* Next.js 16
* React 19
* NextAuth.js
* Tailwind CSS
* Axios

## Backend

* FastAPI
* SQLAlchemy
* PostgreSQL
* Uvicorn

## AI

* OpenAI Whisper
* Groq Llama 3.3
* Google Text-to-Speech (gTTS)

## Database

* Neon PostgreSQL

## Authentication

* Google OAuth 2.0
* NextAuth v5

## DevOps

* Docker
* Docker Compose

---

# 📁 Project Structure

```text
VoiceGPT-AI
│
├── frontend
│   ├── app
│   ├── components
│   ├── lib
│   ├── public
│   ├── auth.js
│   ├── package.json
│   ├── Dockerfile
│   └── .env.local
│
├── backend
│   ├── app
│   │   ├── routes
│   │   ├── services
│   │   ├── models
│   │   ├── database.py
│   │   └── main.py
│   │
│   ├── uploads
│   ├── generated_audio
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
├── docker-compose.yml
└── README.md
```

---

# ⚙️ Environment Variables

## Backend (.env)

```env
DATABASE_URL=your_neon_database_url

GROQ_API_KEY=your_groq_api_key
```

---

## Frontend (.env.local)

```env
GOOGLE_CLIENT_ID=your_google_client_id

GOOGLE_CLIENT_SECRET=your_google_client_secret

AUTH_SECRET=your_auth_secret

AUTH_URL=http://localhost:3000

BACKEND_URL=http://localhost:8000
```

---

# 🔐 Google OAuth Setup

## Step 1

Open:

https://console.cloud.google.com

## Step 2

Create a new project.

## Step 3

Configure OAuth Consent Screen.

## Step 4

Create OAuth Client ID.

## Authorized Redirect URI

```text
http://localhost:3000/api/auth/callback/google
```

## Save

```text
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

inside:

```text
frontend/.env.local
```

---

# 🗄️ Neon PostgreSQL Setup

## Create Account

https://neon.tech

## Create Database

Copy connection string:

```text
postgresql://username:password@host/database
```

Add it to:

```env
DATABASE_URL=
```

---

# 🤖 Groq Setup

## Create Account

https://console.groq.com

## Generate API Key

Add:

```env
GROQ_API_KEY=
```

inside backend `.env`

---

# 🧠 Whisper Setup

Install dependencies:

```bash
pip install openai-whisper
```

Install FFmpeg:

### macOS

```bash
brew install ffmpeg
```

### Verify

```bash
ffmpeg -version
```

---

# ▶️ Running Locally

## Backend

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger Docs:

```text
http://localhost:8000/docs
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:3000
```

---

# 🐳 Docker Setup

## Build Backend

```bash
docker build -t voicegpt-backend ./backend
```

## Run Backend

```bash
docker run \
-p 8000:8000 \
--env-file backend/.env \
voicegpt-backend
```

---

## Build Frontend

```bash
docker build -t voicegpt-frontend ./frontend
```

## Run Frontend

```bash
docker run \
-p 3000:3000 \
--env-file frontend/.env.local \
voicegpt-frontend
```

---

# 🐳 Docker Compose

## Start Entire Project

```bash
docker compose up --build
```

## Stop

```bash
docker compose down
```

---

# 📡 API Endpoints

## Health Check

```http
GET /
```

---

## Create User

```http
POST /users/create
```

---

## Speech To Text

```http
POST /voice/transcribe
```

---

## AI Voice Assistant

```http
POST /voice/ask
```

---

## Conversation History

```http
GET /history/{email}
```

---

# 💾 Database Schema

## Users

| Field | Type    |
| ----- | ------- |
| id    | Integer |
| name  | String  |
| email | String  |
| image | String  |

---

## History

| Field    | Type    |
| -------- | ------- |
| id       | Integer |
| user_id  | Integer |
| question | Text    |
| answer   | Text    |

---

# 🔄 Complete Workflow

```text
Google Login
      │
      ▼
Dashboard
      │
      ▼
Record Voice
      │
      ▼
Whisper
      │
      ▼
Transcript
      │
      ▼
Groq Llama
      │
      ▼
AI Response
      │
      ▼
gTTS
      │
      ▼
Audio Response
      │
      ▼
Store History
      │
      ▼
Display To User
```

---

# 🚀 Future Improvements

* Streaming Responses
* Real-time Voice Chat
* WebSocket Support
* Multi-language Support
* User Settings
* Voice Selection
* OpenAI Realtime API
* Redis Caching
* AWS Deployment
* Kubernetes Deployment

---

# 👨‍💻 Author

**Aman Derwal**

Built as a full-stack AI Voice Assistant project to demonstrate:

* Authentication
* Speech Recognition
* Generative AI
* Text-to-Speech
* Database Design
* Docker
* Full-Stack Development
* AI Application Architecture
