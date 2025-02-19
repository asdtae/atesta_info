"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {signIn} from "next-auth/react";

export default function RegisterPage() {
    const router = useRouter();

    useEffect(() => {
        if (Cookies.get("authToken")) {
            router.push("/social");
        }
    }, []);

    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const res = await fetch("../../api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        });

        const data = await res.json();
        if (!res.ok) return setError(data.message);
        Cookies.set("authToken", data.token, { expires: 7 });
        router.push("/social");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={user.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded bg-gray-700
                        focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                    />
                    <button
                        type="submit"
                        className="w-full bg-[#66B539] hover:bg-[#6D4C41] text-white py-2 rounded font-semibold"
                    >
                        Register
                    </button>
                    <div className="flex flex-row justify-evenly text-[#718693]">
                        <p>Already have an account?</p><Link href={'/login'} className="text-white">Log In!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
