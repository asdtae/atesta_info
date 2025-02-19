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

export default function About() {
    return (
        <div className={`${varela_round.className} min-h-screen flex flex-col
             bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden`}>

            <div className="flex flex-col items-center justify-center text-justify text-white
                 flex-grow px-6 mt-[8%] mb-[8%]">
                <h1 className={`${quicksand.className} text-5xl font-bold`}>About Cyclesphere</h1>

                <p className="mt-6 text-lg max-w-2xl">
                    Cyclesphere aims to revolutionize the way people think about recycling and sustainability.
                    By merging technology with social engagement, we create a seamless platform where users
                    can track their recycling habits, participate in community challenges, and contribute to
                    a cleaner world. Our goal is to make sustainability more accessible, measurable, and rewarding.
                </p>

                <div className="mt-16 text-lg max-w-2xl">
                    <h2 className={`${quicksand.className} text-3xl font-semibold text-center`}>Our Founding Story</h2>
                    <p className="mt-4">
                        Cyclesphere was born out of a frustration with the inefficiency of modern recycling systems.
                        Our anonymous founders, tech entrepreneurs with backgrounds in machine learning and civic engineering—
                        saw a gap between intention and action in sustainable living. They knew that people wanted to recycle
                        and make a difference, but outdated infrastructure, lack of incentives, and unclear information made it challenging.
                    </p>
                    <p className="mt-4">
                        In late 2023, they started brainstorming ways to integrate smart technology with social motivation.
                        The breakthrough came when they realized that gamification and real-time impact tracking could create
                        a ripple effect. What if users could see the immediate benefits of their recycling efforts? What if they
                        could connect with others who shared their eco-conscious mindset?
                    </p>
                    <p className="mt-4">
                        With that vision, Cyclesphere was developed—a digital ecosystem where recycling meets community.
                        After securing seed funding from environmentally-conscious venture capitalists, the team built a
                        platform that empowers individuals, businesses, and municipalities to collaborate for a greener future.
                        Today, Cyclesphere continues to innovate, proving that technology can drive meaningful change for the planet.
                    </p>
                </div>
            </div>
        </div>
    );
}
