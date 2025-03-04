"use client";

import { useState, useEffect } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type SwitchProps = {
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    className?: string;
    thumbClassName?: string;
};

export default function Switch({checked, onCheckedChange, className, thumbClassName,}: SwitchProps) {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const toggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onCheckedChange(newValue);
    };

    return (
        <button
            role="switch"
            aria-checked={isChecked}
            onClick={toggle}
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
                isChecked ? "bg-purple-600" : "bg-gray-400",
                className
            )}
        >
      <span
          className={cn(
              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
              thumbClassName,
              isChecked ? "translate-x-5" : "translate-x-0"
          )}
      />
        </button>
    );
}