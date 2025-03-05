"use client";

import { useState, useRef } from "react";

export default function ProfileUpload({ currentImage, onImageSelect, isLoading  } : {
    currentImage: string;
    onImageSelect: (file: File) => void;
    isLoading: boolean;
}) {
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const DEFAULT_AVATAR = "resources/default-avatar.jpg";

    console.log(currentImage);

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
                onImageSelect(file);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="relative group">
            <img
                src={currentImage || preview || DEFAULT_AVATAR}
                alt="Profile preview"
                className={`w-32 h-32 rounded-full object-cover cursor-pointer border-4 border-gray-100${
                    isLoading ? 'opacity-50' : ''
                }`}
                onClick={() => !isLoading && fileInputRef.current?.click()}
            />
            {isLoading && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
            )}
            <div className="absolute bottom-0 right-0 bg-gray-700 p-1 rounded-full">
                <img
                    src={"resources/camera.png"}
                    alt="Profile small camera"
                    className="w-6 h-6"
                />
            </div>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="absolute inset-0 opacity-0 cursor-pointer"
                name="image"
            />

        </div>
    );
}