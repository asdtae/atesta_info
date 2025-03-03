"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function SessionClient({ children } : { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("authToken");
        if (!token && window.location.pathname !== "/login") {
            router.push("/login");
        }
    }, []);

    return(
        <>
            {children}
        </>
    )
}
