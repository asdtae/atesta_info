"use client"

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

export default function Auth({}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (Cookies.get("authToken")) {
            window.location.href = "/social";
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });

            const data = await response.json();

            if (data.success) {
                Cookies.set("authToken", data.token, {expires: 7});
                window.location.href = "/social";
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred during login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-5 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center">Log In</h2>
                <form onSubmit={handleSubmit} className="space-y-4 p-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} required
                        className="w-full px-4 py-2 rounded bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                        setPassword(e.target.value)} required
                        className="w-full px-4 py-2 rounded bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-[#66B539] hover:bg-[#6D4C41] text-white py-2 rounded font-semibold"
                    >Log In</button>
                    <div className="flex flex-row justify-evenly text-[#718693]">
                        <p>Don't have an account yet?</p>
                        <Link href={'/register'} className="text-white">Register!</Link>
                    </div>
                    <div className={"flex items-center justify-center flex-col"}>
                        <span>test1@example.com</span>
                        <span>password12345</span>
                    </div>
                </form>
            </div>
        </div>
    );
}
