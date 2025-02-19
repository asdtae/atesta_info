import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        const [existingUsers] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if ((existingUsers as any[]).length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
            name,
            email,
            hashedPassword,
        ]);

        //const token = jwt.sign({ email }, " ", { expiresIn: "7d" });
        const token =  email;

        return NextResponse.json({ message: "User registered", token }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
