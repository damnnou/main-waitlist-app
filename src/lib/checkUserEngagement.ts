import axios from "axios";
import { MAIN_CHANNEL_FID, TARGET_CAST_HASH } from "./constants";

const FARCASTER_BEARER_AUTH = process.env.FARCASTER_BEARER_AUTH!;
const FARCASTER_APP_BEARER = process.env.FARCASTER_APP_BEARER!;
const AXIOS_TIMEOUT = 5000;

// async function fetchFollowingUntilSubscribed(fid: number, maxTries = 10): Promise<boolean> {
//     let cursor: string | null = null;
//     let tries = 0;

//     const headers = {
//         "Content-Type": "application/json",
//         Authorization: FARCASTER_APP_BEARER,
//     };

//     while (tries < maxTries) {
//         const url = new URL("https://client.farcaster.xyz/v2/following");
//         url.searchParams.set("fid", String(fid));
//         url.searchParams.set("limit", "100");
//         if (cursor) url.searchParams.set("cursor", cursor);

//         const { data } = await axios.get(url.toString(), {
//             timeout: AXIOS_TIMEOUT,
//             headers,
//         });

//         const users = data?.result?.users || [];

//         if (users.some((user: any) => user.fid === MAIN_CHANNEL_FID)) {
//             return true;
//         }

//         cursor = data?.next?.cursor || null;
//         if (!cursor) break;

//         tries++;
//     }

//     return false;
// }

export async function checkUserEngagement(fid: number) {
    if (!fid) throw new Error("Missing fid");

    const headersApp = {
        "Content-Type": "application/json",
        Authorization: FARCASTER_APP_BEARER,
    };
    const headersUser = {
        "Content-Type": "application/json",
        Authorization: FARCASTER_BEARER_AUTH,
    };

    const [{ data: subscribedToMainData }, { data: userLikes }, { data: castData }] = await Promise.all([
        axios.get(`https://client.farcaster.xyz/v2/following?fid=${fid}&limit=50`, {
            timeout: AXIOS_TIMEOUT,
            headers: headersApp,
        }),
        axios.get(`https://client.farcaster.xyz/v2/user-liked-casts?fid=${fid}&limit=50`, {
            timeout: AXIOS_TIMEOUT,
            headers: headersUser,
        }),
        axios.get(`https://client.farcaster.xyz/v2/casts?fid=${fid}&limit=50`, {
            timeout: AXIOS_TIMEOUT,
            headers: headersApp,
        }),
    ]);

    const didSuscribed = subscribedToMainData?.result?.users?.some((user: any) => user.fid === MAIN_CHANNEL_FID) || false;

    const didLike = userLikes?.result?.casts?.some((like: any) => like.hash === TARGET_CAST_HASH) || false;

    const didRecast =
        castData?.result?.casts?.some((userCast: any) => userCast?.embeds?.casts?.some((c: any) => c.hash === TARGET_CAST_HASH)) || false;

    const eligible = didSuscribed && didLike && didRecast;

    return {
        didSuscribed,
        didLike,
        didRecast,
        eligible,
    };
}
