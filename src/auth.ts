import { AuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createAppClient, viemConnector } from "@farcaster/auth-client";

declare module "next-auth" {
    interface Session {
        user: {
            fid: number;
            wallet: string;
        };
    }

    interface User {
        wallet: string;
    }

    interface JWT {
        wallet: string;
    }
}

function extractWallet(message: string): string | null {
    const match = message.match(/0x[a-fA-F0-9]{40}/);
    return match ? match[0] : null;
}

function getDomainFromUrl(urlString: string | undefined): string {
    if (!urlString) {
        console.warn("NEXTAUTH_URL is not set, using localhost:3000 as fallback");
        return "localhost:3000";
    }
    try {
        const url = new URL(urlString);
        return url.hostname;
    } catch (error) {
        console.error("Invalid NEXTAUTH_URL:", urlString, error);
        console.warn("Using localhost:3000 as fallback");
        return "localhost:3000";
    }
}

export const authOptions: AuthOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Sign in with Farcaster",
            credentials: {
                message: {
                    label: "Message",
                    type: "text",
                    placeholder: "0x0",
                },
                signature: {
                    label: "Signature",
                    type: "text",
                    placeholder: "0x0",
                },
                // In a production app with a server, these should be fetched from
                // your Farcaster data indexer rather than have them accepted as part
                // of credentials.
                // question: should these natively use the Neynar API?
                name: {
                    label: "Name",
                    type: "text",
                    placeholder: "0x0",
                },
                pfp: {
                    label: "Pfp",
                    type: "text",
                    placeholder: "0x0",
                },
            },
            async authorize(credentials, req) {
                try {
                    const csrfToken = req?.body?.csrfToken;
                    if (!csrfToken) {
                        console.error("CSRF token is missing from request");
                        return null;
                    }

                    const appClient = createAppClient({
                        ethereum: viemConnector({
                            rpcUrl: `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
                        }),
                    });

                    const domain = getDomainFromUrl(process.env.NEXTAUTH_URL);

                    const verifyResponse = await appClient.verifySignInMessage({
                        message: credentials?.message as string,
                        signature: credentials?.signature as `0x${string}`,
                        domain,
                        nonce: csrfToken,
                    });

                    const { success, fid } = verifyResponse;

                    if (!success) {
                        return null;
                    }

                    const wallet = extractWallet(credentials?.message || "");
                    if (!wallet) {
                        console.error("Wallet not found in message");
                        return null;
                    }

                    // return in JWT payload
                    return {
                        id: fid.toString(),
                        wallet,
                    };
                } catch (error) {
                    console.error("Error authorizing user:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.wallet = user.wallet;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.fid = parseInt(token.sub ?? "");
                session.user.wallet = token.wallet as string;
            }
            return session;
        },
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
        callbackUrl: {
            name: `next-auth.callback-url`,
            options: {
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
        csrfToken: {
            name: `next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: "none",
                path: "/",
                secure: true,
            },
        },
    },
};

export const getSession = async () => {
    try {
        return await getServerSession(authOptions);
    } catch (error) {
        console.error("Error getting server session:", error);
        return null;
    }
};
