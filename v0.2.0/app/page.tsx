import Link from "next/link";
import { Quicksand } from 'next/font/google';
import {FiActivity, FiCheckCircle, FiUsers} from "react-icons/fi";

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
                     text-center text-white flex-grow px-6 h-screen`}>
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

                <div className="relative z-10 py-20 bg-white/90 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className={`${quicksand_700.className} text-4xl text-center text-[#2A2A2A] mb-16`}>
                            Why Choose CycleSphere?
                        </h2>

                        <div className="grid md:grid-rows-2 gap-1">
                            <div className="flex gap-4">
                                <div className="text-[#66B539] text-4xl mb-4">
                                    <FiActivity />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Eco-Friendly Tracking
                                </h3>
                            </div>
                            <p className="text-gray-600">Monitor your carbon offset and contribute to real environmental impact metrics</p>
                        </div>
                        <div className="grid md:grid-rows-2 gap-1">
                            <div className="flex flex-row-reverse gap-4">
                                <div className="text-[#66B539] text-4xl mb-4">
                                    <FiUsers />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Community Challenges
                                </h3>
                            </div>
                            <p className="flex flex-row-reverse text-gray-600">Join group rides and sustainability challenges with fellow cyclists</p>
                        </div>
                        <div className="grid md:grid-rows-2 gap-1">
                            <div className="flex gap-4">
                                <div className="text-[#66B539] text-4xl mb-4">
                                    <FiCheckCircle />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                                    Smart Analytics
                                </h3>
                            </div>
                            <p className="text-gray-600">Get detailed insights into your riding patterns and environmental impact</p>
                        </div>
                    </div>
                </div>

                <div className="relative  py-20">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h2 className={`${quicksand_700.className} text-4xl text-white mb-8`}>
                            Ready to Pedal Towards Change?
                        </h2>
                        <p className="text-xl text-white/90 mb-12">
                            Join our community of 50,000+ cyclists making a difference in cities worldwide.
                        </p>
                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link href="./register">
                                <button className="px-8 py-4 bg-white text-[#66B539] text-lg font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300">
                                    Create Free Account
                                </button>
                            </Link>
                            <Link href="./about">
                                <button className="px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-full hover:bg-white/10 transition-all duration-300">
                                    Learn More
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
