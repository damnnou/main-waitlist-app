import { NextRequest } from "next/server";
import { db } from "~/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { fid, wallet_address, username, wallet_type } = body;

        if (!fid || !wallet_address) {
            return new Response(JSON.stringify({ error: "Missing fid or wallet" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const docRef = db.collection("Waitlist").doc(String(fid));

        await docRef.set({
            username: username || null,
            wallet_address,
            wallet_type,
            joined_at: new Date(),
        });

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Waitlist save error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const fid = searchParams.get("fid");

        if (!fid) {
            return new Response(JSON.stringify({ error: "Missing fid" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const docRef = db.collection("Waitlist").doc(fid);
        const docSnap = await docRef.get();

        if (!docSnap.exists) {
            return new Response(JSON.stringify({ whitelisted: false }), {
                status: 200,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ whitelisted: true, data: docSnap.data() }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: any) {
        console.error("Waitlist check error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
