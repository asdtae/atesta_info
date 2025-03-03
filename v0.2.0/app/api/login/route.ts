import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const db = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
    const { email, password } = await req.json();

	try {
        const [users] = await db.execute("SELECT id, name, email, password, pfp FROM users WHERE email = ?", [email]);
        const userArray = users as any[];

        if (userArray.length === 0) {
            return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
        }

        const user = userArray[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                name: user.name
            }, JWT_SECRET, { expiresIn: "7d" }
        );

        return NextResponse.json({ success: true, message: "Login successful!", token,
            user: {
                id: user.id,
                name: user.name,
                image: user.pfp
            }}, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error." }, { status: 500 });
    }
}
