import { auth, signIn, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">

        <div className="w-full max-w-md">

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="flex flex-col items-center">

              <img
                src={session.user.image}
                alt="profile"
                className="w-24 h-24 rounded-full border-4 border-purple-500"
              />

              <h1 className="mt-5 text-2xl font-bold">
                Welcome Back
              </h1>

              <p className="mt-1 text-zinc-400">
                {session.user.name}
              </p>

              <p className="text-sm text-zinc-500">
                {session.user.email}
              </p>

            </div>

            <div className="mt-8 flex flex-col gap-3">

              <a
                href="/dashboard"
                className="
                  w-full
                  text-center
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-purple-600
                  to-blue-600
                  font-medium
                  hover:opacity-90
                  transition
                "
              >
                Open Dashboard
              </a>

              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button
                  className="
                    w-full
                    py-3
                    rounded-xl
                    border
                    border-white/10
                    hover:bg-white/5
                    transition
                  "
                >
                  Sign Out
                </button>
              </form>

            </div>

          </div>

        </div>

      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] text-white">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#4f46e5_0%,transparent_45%)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#9333ea_0%,transparent_35%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6">

        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">

          <div>

            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300">
              🎤 Voice AI Assistant
            </div>

            <h1 className="mt-8 text-5xl lg:text-7xl font-bold leading-tight">
              Talk with AI
              <span className="block bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Naturally
              </span>
            </h1>

            <p className="mt-6 text-lg text-zinc-400 max-w-xl">
              Real-time AI voice assistant powered by Whisper,
              Groq Llama 3.3, FastAPI and PostgreSQL.
              Speak naturally and receive intelligent spoken responses.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
                Whisper STT
              </span>

              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
                Groq Llama 3.3
              </span>

              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
                PostgreSQL
              </span>

              <span className="rounded-full bg-white/5 border border-white/10 px-4 py-2 text-sm">
                Google OAuth
              </span>

            </div>

          </div>

          <div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

              <div className="text-center">

                <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-3xl">
                  🎙️
                </div>

                <h2 className="mt-6 text-3xl font-bold">
                  VoiceGPT AI
                </h2>

                <p className="mt-2 text-zinc-400">
                  Sign in to start your AI voice conversations
                </p>

              </div>

              <form
                className="mt-8"
                action={async () => {
                  "use server";
                  await signIn("google");
                }}
              >
                <button
                  className="
                    w-full
                    rounded-xl
                    bg-white
                    text-black
                    py-4
                    font-semibold
                    hover:scale-[1.02]
                    transition
                  "
                >
                  Continue with Google
                </button>
              </form>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}