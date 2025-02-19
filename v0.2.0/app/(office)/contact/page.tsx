"use client"

import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";
import { useState } from 'react';

const quicksand = Quicksand({
    weight: ['700'],
    subsets: ['latin']
})

const varela_round = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(`Error: ${data.error}`);
            }
        } catch (err) {
            setStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div className={`${varela_round.className} min-h-screen flex bg-gradient-to-br
             from-indigo-900 via-purple-800 to-pink-700 text-white relative overflow-hidden`}>
            <div className="flex flex-row items-center justify-evenly text-center flex-grow px-6">
                <div className="flex flex-col items-center text-center">
                    <h1 className={`${quicksand.className} text-5xl font-bold`}>Contact Us</h1>
                    <p className="mt-4 text-lg max-w-2xl">
                        Have questions, suggestions, or feedback? Reach out to us!
                    </p>

                    <div className="mt-8 text-lg max-w-3xl text-left space-y-4">
                        <p><span className="font-semibold">Email:</span> support@cyclesphere.com</p>
                        <p><span className="font-semibold">Phone:</span> +1 (800) 555-0199</p>
                        <p><span className="font-semibold">Address:</span> 123 Greenway Blvd, Palo Alto, CA 94301</p>
                        <p><span className="font-semibold">Business Hours:</span> Mon-Fri, 9 AM - 5 PM PST</p>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center text-center
                mt-8 bg-[#374148]/90 text-[#F1F8E9] p-6 rounded-lg shadow-lg w-full max-w-lg">
                    <h2 className={`${quicksand.className} text-2xl font-semibold text-center`}>Send Us a Message</h2>
                    <form className="mt-4 space-y-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-[#545e64]/50 w-full p-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="bg-[#545e64]/50 w-full p-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="bg-[#545e64]/50 w-full p-3 border rounded-lg
                            focus:outline-none focus:ring-2 focus:ring-[#66B539]"
                        />
                        <button
                            type="submit"
                            className="w-full bg-[#66B539] text-white p-3 rounded-lg
                            font-semibold hover:bg-[#6D4C41] transition"
                        >Send Message</button>
                    </form>
                    {status && <p className="mt-4">{status}</p>}
                </div>
            </div>
        </div>
    );
}
