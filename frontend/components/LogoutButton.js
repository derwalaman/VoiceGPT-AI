"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button
            onClick={() =>
                signOut({
                    callbackUrl: "/",
                })
            }
            className="
                px-4
                py-2
                rounded-xl
                bg-red-500/20
                border
                border-red-500/30
                text-red-300
                hover:bg-red-500/30
                transition
            "
        >
            Logout
        </button>
    );
}