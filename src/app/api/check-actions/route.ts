import axios from "axios";
import { NextRequest } from "next/server";
import { NeynarAPIClient, Configuration } from "@neynar/nodejs-sdk";
import { CastParamType } from "@neynar/nodejs-sdk/build/api";

const config = new Configuration({
    apiKey: process.env.NEYNAR_API_KEY!,
});
const client = new NeynarAPIClient(config);

const MAIN_CHANNEL_ID = "celo";
const TARGET_CAST_URL = "https://farcaster.xyz/celo/0x30d42443";

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
            `https://api.farcaster.xyz/v1/user-channel?fid=${fid}&channelId=${MAIN_CHANNEL_ID}`
        );
        const didSuscribed = subscribedToMainData.result.following;

        const { cast } = await client.lookupCastByHashOrWarpcastUrl({
            identifier: TARGET_CAST_URL,
            type: CastParamType.Url,
        });

        const likes = cast.reactions.likes;
        const didLike = likes.some((like) => like.fid === fid);

        const recasts = cast.reactions.recasts;
        const didRecast = recasts.some((recast) => recast.fid === fid);

        const { data: castData } = await axios.get(`https://client.farcaster.xyz/v2/casts?fid=${fid}&limit=50`);
        const replies = castData?.result?.casts;
        const didRecastWithQuote = replies?.some((userCast: any) => userCast?.embeds?.casts?.some((c: any) => c.hash === cast.hash));

        const eligible = didSuscribed && didLike && didRecast;

        // console.log(replies);
        // console.log("didSuscribed", didSuscribed);
        // console.log("didLike", didLike);
        // console.log("didRecast", didRecast);
        // console.log("didRecastWithQuote", didRecastWithQuote);
        // console.log("eligible", eligible);

        return new Response(
            JSON.stringify({
                didSuscribed,
                didLike,
                didRecast,
                didRecastWithQuote,
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
