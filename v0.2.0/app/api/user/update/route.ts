import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { getCurrentUser } from "@/app/auth";
import { validateUserUpdate } from "@/app/validation";
import { writeFile } from "fs/promises";
import path from "path";

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

        const image = formData.get('image');
        if (image) {
            const file = image as File;
            const filename = `image-${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
            const uploadPath = './public/uploads';
            const buffer = Buffer.from(await file.arrayBuffer());
            await writeFile(path.join(uploadPath, filename), buffer);
            updates.pfp = `/uploads/${filename}`;

            //console.log(`File saved to ${path.join(uploadPath, filename)}`);
        }

        const name = formData.get("name");
        if (name) {
            const validation = validateUserUpdate(name);
            if (!validation.valid) {
                return NextResponse.json({ errors: validation.errors }, { status: 400 });
            }
            updates.name = name.toString();
        }

        const email = formData.get("email");
        if (email) {
            const validation = validateUserUpdate(email);
            if (!validation.valid) {
                return NextResponse.json({ errors: validation.errors }, { status: 400 });
            }
            updates.email = email.toString();
        }

        const bio = formData.get('bio');
        if (bio) updates.bio = bio.toString();

        if (Object.keys(updates).length > 0) {
            const setClause = Object.keys(updates)
                .map((key) => `${key} = ?`)
                .join(", ");
            const values = [...Object.values(updates), user.id];

            await db.execute(`UPDATE users SET ${setClause} WHERE id = ?`, values);
        }

        const [users] = await db.execute("SELECT id, name, email, bio, pfp FROM users WHERE id = ?", [user.id]);

        return NextResponse.json({ success: true, user: users[0] });

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}
