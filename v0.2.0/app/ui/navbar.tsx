"use client";

import Link from "next/link";
import { Quicksand } from 'next/font/google';
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const quicksand_600 = Quicksand({
    weight: ['600'],
    subsets: ['latin']
})

const quicksand_700 = Quicksand({
    weight: ['700'],
    subsets: ['latin']
})

export default function Navbar() {
    const [user, setUser] = useState<{
        name: string;
        image?: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = Cookies.get("authToken");

        if(token){
            fetch('../api/me', {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch user");
                    return res.json();
                })
                .then((data) => setUser(data.user))
                .catch(() => setUser(null))
                .finally(() => setLoading(false));
        } else {
            setUser(null);
            setLoading(false);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("authToken");
        setUser(null);
        window.location.href = "/";
    };

    return (
        <nav className={`${quicksand_600.className} fixed top-0 left-0 w-full
             flex justify-between items-center px-16 py-8 bg-[#374148]/50 text-white
             backdrop-blur-md transition-all duration-300 z-50`}>
            <div className="ml-[14%] text-3xl">
                <Link href="/" className="hover:text-[#ffbf92]">Cyclesphere</Link>
            </div>
            <div className={`${quicksand_700.className} mr-[14%] flex items-center space-x-6 text-xl`}>
                <Link href={"../about"} className="hover:text-[#ffbf92]">About</Link>
                <Link href={"../contact"} className="hover:text-[#ffbf92]">Contact</Link>
                <span className="w-1 h-1 bg-white rounded-full"></span>
                {!loading && (
                    user ? (
                        <div className="flex items-center space-x-4">
                            {
                                user.image && (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )
                            }
                            <span>{user.name}</span>
                            <button onClick={handleLogout} className="hover:text-[#ffbf92]">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link href={"../register"} className="hover:text-[#ffbf92]">Sign In</Link>
                    )
                )}
            </div>
        </nav>
    );
}