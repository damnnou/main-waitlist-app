import axios from "axios";
import { NextRequest } from "next/server";
import { MAIN_CHANNEL_ID, TARGET_CAST_HASH } from "~/lib/constants";

const FARCASTER_BEARER_AUTH = process.env.FARCASTER_BEARER_AUTH;

const FARCASTER_APP_BEARER = "wc_secret_f7dfffa9c12157ca8e5f3219c7d94cc5f67b7f4c5419c1fabd728a3a_84525966";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const fid = parseInt(searchParams.get("fid") || "0");

    if (!fid) {
        return new Response(JSON.stringify({ error: "Missing fid parameter" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const { data: subscribedToMainData } = await axios.get(
            `https://api.farcaster.xyz/v1/user-channel?fid=${fid}&channelId=${MAIN_CHANNEL_ID}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: FARCASTER_APP_BEARER,
                },
            }
        );
        const didSuscribed = subscribedToMainData.result.following;

        const { data: userLikes } = await axios.get(`https://client.farcaster.xyz/v2/user-liked-casts?fid=${fid}&limit=50`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: FARCASTER_BEARER_AUTH,
            },
        });

        const likes = userLikes.result.casts;
        const didLike = likes.some((like: any) => like.hash === TARGET_CAST_HASH);

        const { data: castData } = await axios.get(`https://client.farcaster.xyz/v2/casts?fid=${fid}&limit=50`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: FARCASTER_APP_BEARER,
            },
        });
        const replies = castData?.result?.casts;
        const didRecast = replies?.some((userCast: any) => userCast?.embeds?.casts?.some((c: any) => c.hash === TARGET_CAST_HASH));

        const eligible = didSuscribed && didLike && didRecast;

        return new Response(
            JSON.stringify({
                didSuscribed,
                didLike,
                didRecast,
                eligible,
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error: any) {
        console.error("Verification error:", error);
        return new Response(JSON.stringify({ error: "Failed to verify user actions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
