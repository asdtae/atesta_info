import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";
import { writeFile } from "fs/promises";
import path from "path";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "cyclesphere",
});

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const imageFile = formData.get("image") as File | null;
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        const maxSize = 5 * 1024 * 1024;

        if (!name || !email || !password) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        const [existingUsers] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if ((existingUsers as any[]).length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        let imageUrl = "/default-avatar.jpg";
        if (imageFile) {
            if (!allowedTypes.includes(imageFile.type)) {
                return NextResponse.json({ error: "Only JPG, PNG, and WEBP files are allowed" }, { status: 400 });
            }

            if (imageFile.size > maxSize) {
                return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
            }

            const extension = imageFile.name.split('.').pop();
            const filename = `profile_${Date.now()}.${extension}`;
            const uploadDir = path.join(process.cwd(), "public/uploads");
            const filePath = path.join(uploadDir, filename);

            const buffer = Buffer.from(await imageFile.arrayBuffer());
            await writeFile(filePath, buffer);
            imageUrl = `/uploads/${filename}`;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [insertResult] = await db.execute("INSERT INTO users (name, email, password, pfp) VALUES (?, ?, ?, ?)", [name, email, hashedPassword, imageUrl]);

        const userId = (insertResult as any).insertId;

        const token = jwt.sign(
            {
                id: userId,
                email: email,
                name: name
            },
            JWT_SECRET, { expiresIn: "7d" }
        );

        return NextResponse.json({ success: true, message: "User registered", token,
            user: {
                id: userId,
                name,
                email,
                image: imageUrl
            }}, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}
