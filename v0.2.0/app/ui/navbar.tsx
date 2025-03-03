"use client";

import Link from "next/link";
import { Quicksand } from 'next/font/google';
import Cookies from "js-cookie";
import { useEffect, useState, useRef  } from "react";

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
        email: string;
        image?: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get("authToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/me", {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if (!response.ok) new Error("Failed to fetch user");

                const data = await response.json();
                setUser({
                    name: data.user.name,
                    email: data.user.email,
                    image: data.user.image
                });

            } catch (error) {
                Cookies.remove("authToken");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        Cookies.remove("authToken");
        setUser(null);
        window.location.href = "/";
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <>
        <nav className={`${quicksand_600.className} fixed top-0 left-0 w-full
             flex justify-between items-center px-16 py-8 backdrop-composite text-white
             transition-all duration-300 z-50`}>
            <div className="ml-[14%] text-3xl">
                <Link href="/" className="hover:text-[#ffbf92]">Cyclesphere</Link>
            </div>
            <div className={`${quicksand_700.className} mr-[14%] flex items-center space-x-6 text-xl`}>
                {!loading && (
                    user ? (
                        <div className="relative" ref={dropdownRef}>
                            <div className="flex items-center space-x-4 cursor-pointer
                                 hover:opacity-80 transition-opacity"
                                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                {user.image && (
                                    <img
                                        src={user.image}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full"
                                    />
                                )}
                                <div className="flex flex-col items-start min-w-[120px]">
                                    <span className="text-sm whitespace-nowrap">{user.name}</span>
                                    <span className="text-xs text-[#718693] whitespace-nowrap
                                          overflow-hidden overflow-ellipsis max-w-[160px]">{user.email}</span>
                                </div>
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute left-0 top-full mt-2 w-full min-w-[200px]
                                     backdrop-composite border border-white/10 rounded-lg shadow-xl py-2">
                                    <Link
                                        href="../social"
                                        className="block px-4 py-2 text-sm hover:bg-[#46515a]
                                        transition-colors whitespace-nowrap"
                                    >💬 Social</Link>
                                    <div className="px-4 py-2 text-sm hover:bg-[#46515a]
                                         transition-colors cursor-pointer"
                                    >🎨 Appearance
                                        <div className="ml-2 mt-1 space-y-1">
                                            <div
                                                onClick={toggleDarkMode}
                                                className="flex items-center
                                                hover:bg-[#46515a] px-2 py-1 rounded
                                                whitespace-nowrap">
                                                <span className="mr-2">🌓</span>
                                                {darkMode ? 'Dark' : 'Light'} Mode
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href="../settings"
                                        className="block px-4 py-2 text-sm hover:bg-[#46515a]
                                        transition-colors whitespace-nowrap"
                                    >⚙ Settings</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4
                                        py-2 text-sm hover:bg-[#46515a]
                                        hover:text-[#FF477B] transition-colors
                                        whitespace-nowrap"
                                    >👋 Sign Out</button>
                                </div>
                                // TODO: teszt szerint legyen justifyolva ne emoji szerint + a social linket ki lehet hozni a pfp melle
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href={"../about"} className="hover:text-[#ffbf92]">About</Link>
                            <Link href={"../contact"} className="hover:text-[#ffbf92]">Contact</Link>
                            <span className="w-1 h-1 bg-white rounded-full"></span>
                            <Link href={"../register"} className="hover:text-[#ffbf92]">Sign In</Link>
                        </>
                    )
                )}
            </div>
        </nav>
        </>
    );
}