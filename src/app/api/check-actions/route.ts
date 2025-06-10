import { NextRequest } from "next/server";
import { checkUserEngagement } from "~/lib/checkUserEngagement";

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
        const result = await checkUserEngagement(fid);
        return new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Verification error:", error);
        return new Response(JSON.stringify({ error: "Failed to verify user actions" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
