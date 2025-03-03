import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
    const token = req.headers.get("Authorization")?.split(" ")[1];

    if (!token) {
        return NextResponse.json({ error: "Authorization token required" }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const [users] = await db.execute("SELECT id, name, email, pfp FROM users WHERE id = ?", [decoded.userId]);

        const userArray = users as any[];

        if (userArray.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const user = userArray[0];

        return NextResponse.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                image: user.pfp
            }
        });

    } catch (error) {
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
