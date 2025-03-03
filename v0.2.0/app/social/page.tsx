'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation'
import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";
import Cookies from "js-cookie";

const quicksand = Quicksand({
    weight: ['400'],
    subsets: ['latin']
})

const varela_round = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})

function SignOut(){
    Cookies.remove("authToken");
}

export default function Social() {

    
    return (
        <div className={`${quicksand.className} min-h-screen flex flex-col
             bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden`}>
            <div className={`flex flex-col items-center justify-center text-justify text-white
                 flex-grow px-6 mt-[8%] mb-[8%] text-5xl font-bold`}>
                <button onClick={SignOut}>Logout</button>
            </div>
        </div>
    )
}