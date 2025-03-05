import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { getCurrentUser } from "@/app/auth";
import { validateUserUpdate } from "@/app/validation";
import { writeFile } from "fs/promises";

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

        const formData = await req.formData();
        const updates: Record<string, any> = {};

        const avatar = formData.get('avatar');
        if (avatar) {
            const file = avatar as File;
            const filename = `avatar-${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
            const uploadPath = process.env.UPLOAD_PATH || './public/uploads';
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(`${uploadPath}/${filename}`, buffer);
            updates.avatar = `/uploads/${filename}`;
        }

        const name = formData.get('name');
        if (name) updates.name = name.toString();

        const bio = formData.get('bio');
        if (bio) updates.bio = bio.toString();

        await db.execute("UPDATE users SET ? WHERE id = ?", [updates, user.id]);

        const [users] = await db.execute("SELECT id, name, email, bio, pfp FROM users WHERE id = ?", [user.id]);

        return NextResponse.json({ success: true, user: users[0] });

    } catch (error) {
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
