'use client';

import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";

const quicksand = Quicksand({
    weight: ['400'],
    subsets: ['latin']
})

const varela_round = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})

export default function Social() {
    return (
        <div className={`${quicksand.className} min-h-screen flex flex-col
             bg-gradient-to-br
                 from-[#00A878]  to-[#A57548] relative overflow-hidden`}>
            <div className={`flex flex-col items-center justify-center text-justify text-white
                 flex-grow px-6 mt-[8%] mb-[8%] text-5xl font-bold`}>
                Chat
            </div>
        </div>
    )
}