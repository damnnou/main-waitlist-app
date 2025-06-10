import { NextResponse } from "next/server";

export async function GET() {
    try {
        const textContent = "d6b8ff20-9062-42ef-b21a-12876086e918=733517304bddd5fdf958bdcbe5dab3e99112ffb99df580a33a058581fa0b020c";

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
