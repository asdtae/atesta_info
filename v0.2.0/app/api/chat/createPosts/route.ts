import {getCurrentUser} from "@/app/auth";
import { NextRequest, NextResponse } from "next/server";
import {validatePostContent} from "@/app/validation";
import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const requestBody = await req.json();
        if (!requestBody.content) {
            return NextResponse.json({ error: "Invalid content" }, { status: 400 });
        }

        const { content } = requestBody;

        const validContent = validatePostContent(content);
        if (!validContent) {
            return NextResponse.json({ error: "Invalid content" }, { status: 400 });
        }

        const [insertResult] = await db.execute("INSERT INTO posts (userId, content) VALUES (?, ?)", [user.id, content]);

        return NextResponse.json({ok: true}, {status: 201});

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}