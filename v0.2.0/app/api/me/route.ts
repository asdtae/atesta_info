import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const token = request.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json(
            { error: "Authorization token required" },
            { status: 401 }
        );
    }

    try {
        if (token === "test@example.com")
        {
            const user = {
                name: "John Doe",
                image: "/test/1.png",
            };
            return NextResponse.json({user});
        }
    } catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
