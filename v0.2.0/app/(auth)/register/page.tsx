"use client";

import {useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import ProfileUpload from "./pfpUpload"

export default function RegisterPage() {
    const router = useRouter();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (Cookies.get("authToken")) {
            router.push("/social");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const formData = new FormData();
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                Cookies.set("authToken", data.token, { expires: 7 });
                window.location.href = "/social";
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError("An error occurred during registration");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center">Create an Account</h2>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-center">
                        <ProfileUpload onImageSelect={(file) => setImageFile(file)} />
                    </div>

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
                        <p>Already have an account?</p>
                        <Link href={'/login'} className="text-white">Log In!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
