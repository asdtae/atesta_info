import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, password } = await req.json();

    if (email === "test@example.com" && password === "password123") {
        const token =  'valid-token';
        return NextResponse.json({ success: true, message: "Login successful!", token}, { status: 200 });
    }

    return NextResponse.json({message: "Invalid credentials." }, { status: 401 });
}
