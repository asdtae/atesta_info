"use client";

import { useState, useRef } from "react";

export default function ProfileUpload({ onImageSelect  }) {
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const DEFAULT_AVATAR = "resources/default-avatar.jpg";

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setPreview(DEFAULT_AVATAR);
            onImageSelect(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
                setPreview(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);

        onImageSelect(file);
    };

    return (
        <div className="relative group">
            <img
                src={preview || DEFAULT_AVATAR}
                alt="Profile preview"
                className="w-32 h-32 rounded-full object-cover cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
            />
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
                name="image"
            />
            <div className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full">
                <img
                    src={"resources/camera.png"}
                    alt="Profile small camera"
                    className="w-6 h-6 text-white"
                />
            </div>
        </div>
    );
}