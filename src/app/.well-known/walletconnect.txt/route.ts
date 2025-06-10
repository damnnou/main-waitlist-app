import { NextResponse } from "next/server";

export async function GET() {
    try {
        const textContent = "";

        return new NextResponse(textContent, {
            status: 200,
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Content-Disposition": 'attachment; filename="walletconnect.txt"',
            },
        });
    } catch (error: any) {
        console.error("Error generating text file:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
