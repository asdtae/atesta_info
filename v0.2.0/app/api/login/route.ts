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

//const JWT_SECRET = process.env.JWT_SECRET || "your_strong_secret_key_here";

export async function POST(req: Request) {
    const { email, password } = await req.json();

	try { 
            const [existingUsers] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
            if ((existingUsers as any[]).length > 0) {
                const hashedPassword = await db.execute("SELECT * FROM users WHERE password = ?", [password]);
                if((hashedPassword as any[]).length > 0) {
                    //const token = await db.execute("SELECT * FROM users WHERE email = ? AND password = ?", [email, password]);
                    const token = email;
                    return NextResponse.json({ success: true, message: "Login successful!", token }, { status: 201 });
                }
                else {
                    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
                }
            }
            else {
                return NextResponse.json({ success: false, message: "Invalid email or password." }, { status: 401 });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: "Invalid credentials." }, { status: 401 });
        }
}
