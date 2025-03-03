import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    if (token === "test@example.com") {
        const user = {
            name: "John Doe",
            image: "",
        };
        return NextResponse.json({ user });
    } else {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}
