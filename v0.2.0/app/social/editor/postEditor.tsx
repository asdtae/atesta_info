'use client';

import {EditorContent, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import {Placeholder} from "@tiptap/extension-placeholder";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import "./styles.css";

export default function PostEditor() {
    const [user, setUser] = useState<{
        name: string;
        email: string;
        image?: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

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

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bold: false,
                italic: false
            }),
            Placeholder.configure({
                placeholder: "Write something awesome..."
            })
        ]
    })

    const input = editor?.getText({
        blockSeparator: "\n",
    }) || "";

    async function onSubmit() {
        try {
            const response = await fetch("/api/chat/createPosts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({content: input}),
            });

            if (!response.ok) new Error("Failed to send post");

            editor?.commands.clearContent();
        } catch (error) {
            console.error("Error sending post:", error);
        }
    }

    return (
        <div className={`flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm`}>
            <div className={`flex gap-5`}>
                {!loading && (
                    user ? (
                        user.image && (
                            <img
                                src={user.image}
                                alt={user.name}
                                className="w-12 h-12 rounded-full"
                            />
                        )
                    ) : (
                        <></>
                    )
                )}
                <EditorContent
                    editor={editor}
                    className={`w-full max-h-[20rem] overflow-y-auto bg-background rounded-2xl px-5 py-3`}>
                </EditorContent>
                <div className={`flex justify-end`}>
                    <button
                        onClick={onSubmit}
                        disabled={input.trim().length === 0}
                        className={`bg-[#00A878] hover:bg-[#00A878] text-white font-bold py-2 px-4 rounded-full`}
                    >
                    Post
                    </button>
                </div>
            </div>
        </div>
    )
}