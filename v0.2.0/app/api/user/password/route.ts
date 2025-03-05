import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/app/auth";
import { validatePasswordChange } from "@/app/validation";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { currentPassword, newPassword } = await req.json();
        const validation = validatePasswordChange(newPassword);
        if (!validation.valid) {
            return NextResponse.json({ errors: validation.errors }, { status: 400 });
        }

        const [users] = await db.execute("SELECT password FROM users WHERE id = ?", [user.id]);
        const match = await bcrypt.compare(currentPassword, users[0].password);
        if (!match) return NextResponse.json({ error: "Invalid current password" }, { status: 400 });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, user.id]);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}