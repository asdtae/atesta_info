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
        const [result] = await db.execute("SELECT hashtag, COUNT(*) AS count FROM (SELECT SUBSTRING_INDEX(SUBSTRING_INDEX(content, '#', n), ' ', 1) AS hashtag FROM posts JOIN ( SELECT 1 AS n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) numbers ON CHAR_LENGTH(content) - CHAR_LENGTH(REPLACE(content, '#', '')) >= n - 1 WHERE content REGEXP '#[a-zA-Z0-9_]+' ) hashtags GROUP BY hashtag ORDER BY count DESC, hashtag LIMIT 5");

        return NextResponse.json({ok: true, result: result || []}, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Server error"}, {status: 500});
    }
}