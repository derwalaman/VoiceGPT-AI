import { auth } from "@/auth";
import { redirect } from "next/navigation";

import VoiceRecorder from "@/components/VoiceRecorder";
import HistoryList from "@/components/HistoryList";
import LogoutButton from "@/components/LogoutButton";

export default async function Dashboard() {

    const session = await auth();

    if (!session?.user) {
        redirect("/");
    }

    return (
        <main
            className="
            min-h-screen
            bg-[#030712]
            text-white
        "
        >

            <div
                className="
                fixed
                inset-0
                -z-10
                bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),transparent_40%)]
            "
            />

            <header
                className="
                sticky
                top-0
                z-50
                border-b
                border-white/10
                bg-black/40
                backdrop-blur-xl
            "
            >

                <div
                    className="
                    max-w-7xl
                    mx-auto
                    px-6
                    py-4
                    flex
                    items-center
                    justify-between
                "
                >

                    <div>

                        <h1
                            className="
                            text-2xl
                            font-bold
                            bg-gradient-to-r
                            from-purple-400
                            via-blue-400
                            to-cyan-400
                            bg-clip-text
                            text-transparent
                        "
                        >
                            VoiceGPT AI
                        </h1>

                        <p
                            className="
                            text-sm
                            text-zinc-400
                        "
                        >
                            AI Voice Assistant
                        </p>

                    </div>

                    <div
                        className="
                        flex
                        items-center
                        gap-4
                    "
                    >

                        <img
                            src={session.user.image}
                            alt="profile"
                            className="
                            w-11
                            h-11
                            rounded-full
                            border
                            border-white/20
                        "
                        />

                        <div>

                            <p
                                className="
                                font-medium
                            "
                            >
                                {session.user.name}
                            </p>

                            <p
                                className="
                                text-xs
                                text-zinc-400
                            "
                            >
                                {session.user.email}
                            </p>

                        </div>

                        <LogoutButton />

                    </div>

                </div>

            </header>

            <div
                className="
                max-w-7xl
                mx-auto
                px-6
                py-8
            "
            >

                <div
                    className="
                    mb-8
                    rounded-3xl
                    border
                    border-white/10
                    bg-gradient-to-r
                    from-purple-500/10
                    via-blue-500/10
                    to-cyan-500/10
                    p-8
                    backdrop-blur-xl
                "
                >

                    <h1
                        className="
                        text-4xl
                        md:text-5xl
                        font-bold
                    "
                    >
                        Welcome back,
                        <span
                            className="
                            block
                            mt-2
                            text-purple-400
                        "
                        >
                            {session.user.name}
                        </span>
                    </h1>

                    <p
                        className="
                        mt-4
                        text-zinc-400
                        max-w-2xl
                    "
                    >
                        Talk naturally with AI and receive
                        intelligent responses powered by
                        Whisper Speech Recognition,
                        Groq Llama 3.3,
                        PostgreSQL and Text-to-Speech.
                    </p>

                    <div
                        className="
                        flex
                        flex-wrap
                        gap-3
                        mt-6
                    "
                    >

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
                            PostgreSQL
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
                            Google OAuth
                        </span>

                    </div>

                </div>

                <div
                    className="
                    grid
                    lg:grid-cols-12
                    gap-6
                "
                >

                    <div
                        className="
                        lg:col-span-4
                    "
                    >
                        <HistoryList
                            email={session.user.email}
                        />
                    </div>

                    <div
                        className="
                        lg:col-span-8
                    "
                    >
                        <VoiceRecorder
                            email={session.user.email}
                        />
                    </div>

                </div>

            </div>

        </main>
    );

}
