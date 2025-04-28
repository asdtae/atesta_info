import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

export async function GET() {
    try {

        const [posts] = await db.execute("SELECT posts.*, users.name, users.pfp FROM posts JOIN users ON posts.userId = users.id ORDER BY posts.created_at DESC");

        return NextResponse.json({ok: true, posts: posts || []}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}