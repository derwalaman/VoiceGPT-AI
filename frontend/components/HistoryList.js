"use client";

import { useEffect, useState } from "react";

export default function HistoryList({ email }) {

    const [history, setHistory] = useState([]);

    useEffect(() => {

        fetch(
            `http://localhost:8000/history/${email}`
        )
            .then((res) => res.json())
            .then((data) => setHistory(data))
            .catch((err) => console.error(err));

    }, [email]);

    return (
        <div
            className="
            bg-white/5
            border
            border-white/10
            rounded-3xl
            backdrop-blur-xl
            overflow-hidden
        "
        >

            <div
                className="
                border-b
                border-white/10
                p-5
            "
            >

                <h2
                    className="
                    text-xl
                    font-bold
                    flex
                    items-center
                    gap-2
                "
                >
                    💬 Conversations
                </h2>

                <p
                    className="
                    text-sm
                    text-zinc-400
                    mt-1
                "
                >
                    Your recent AI interactions
                </p>

            </div>

            <div
                className="
                max-h-[800px]
                overflow-y-auto
                p-3
                space-y-3
            "
            >

                {history.length === 0 && (

                    <div
                        className="
                        text-center
                        py-12
                        text-zinc-500
                    "
                    >
                        No conversations yet
                    </div>

                )}

                {history.map((item) => (

                    <div
                        key={item.id}
                        className="
                        group
                        p-4
                        rounded-2xl
                        border
                        border-white/10
                        bg-black/20
                        hover:bg-white/5
                        hover:border-purple-500/30
                        transition-all
                        duration-300
                        cursor-pointer
                    "
                    >

                        <div
                            className="
                            flex
                            items-start
                            gap-3
                        "
                        >

                            <div
                                className="
                                w-10
                                h-10
                                rounded-full
                                bg-gradient-to-br
                                from-purple-500
                                to-blue-500
                                flex
                                items-center
                                justify-center
                                text-sm
                                shrink-0
                            "
                            >
                                🤖
                            </div>

                            <div className="flex-1">

                                <p
                                    className="
                                    font-medium
                                    text-white
                                    line-clamp-2
                                "
                                >
                                    {item.question}
                                </p>

                                <p
                                    className="
                                    mt-2
                                    text-sm
                                    text-zinc-400
                                    line-clamp-3
                                "
                                >
                                    {item.answer}
                                </p>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );

}
