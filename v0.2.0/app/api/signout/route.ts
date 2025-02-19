import { NextResponse } from "next/server";
import Cookies from "js-cookie";

export async function POST() {
    const response = NextResponse.redirect("/");

    response.cookies.delete("next-auth.session-token");
    response.cookies.delete("next-auth.csrf-token");
    return response;
}
