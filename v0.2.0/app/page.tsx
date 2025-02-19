import Link from "next/link";
import Lorem from "./lorem";
import { Quicksand } from 'next/font/google';

const quicksand_700 = Quicksand({
    weight: ['700'],
    subsets: ['latin']
})

export default function HomePage() {
    return (
        <div>
            <div className="min-h-screen flex flex-col bg-gradient-to-br
                 from-[#00A878]  to-[#A57548] relative overflow-hidden">
                <div className={`${quicksand_700.className} flex flex-col items-center justify-center 
                     text-center text-white flex-grow px-6`}>
                    <h1 className={`text-7xl font-bold`}>Welcome to Cyclesphere</h1>
                    <p className="mt-4 text-lg">Reduce, Reuse, Recycle — For a Cleaner,
                        <span className="mt-4 text-lg text-[#13ee1c]"> Greener</span> Future!</p>

                    <Link href={"/register"}>
                        <button className="mt-6 px-6 py-3 bg-[#66B539] text-white text-lg
                                font-semibold rounded-full shadow-lg hover:bg-[#6D4C41] transition">
                        Get Started
                        </button>
                    </Link>
                </div>
            </div>
            <Lorem />
            <Lorem />
        </div>
    );
}
