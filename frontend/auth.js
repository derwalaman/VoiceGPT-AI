import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } =
    NextAuth({

        providers: [
            Google({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET
            })
        ],

        pages: {
            signIn: "/"
        },

        callbacks: {

            async signIn({ user }) {

                try {

                    await fetch(
                        `${process.env.BACKEND_URL}/users/create`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type": "application/json"
                            },

                            body: JSON.stringify({
                                email: user.email,
                                name: user.name,
                                image: user.image
                            })
                        }
                    );

                } catch (error) {

                    console.log(error);

                }

                return true;
            },

            async redirect({ baseUrl }) {
                return `${baseUrl}/dashboard`;
            }
        }
    });