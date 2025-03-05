import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { getCurrentUser } from "@/app/auth";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

export async function DELETE(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        await db.execute("DELETE FROM `users` WHERE id = ?", [user.id]);

        return NextResponse.json({ success: true });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}