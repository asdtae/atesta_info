import Link from "next/link";

export default function Footer() {
    return (
        <footer className="mt-auto bg-[#111826] text-white py-6 text-center">
            <Link href="/legal/copyright.html" className="opacity-70">&copy; 2025 asdtae</Link>
            <div className="flex justify-center space-x-4 mt-2">
                <Link href="/legal/privacy-policy.html" className="hover:opacity-100 opacity-70">Privacy Policy</Link>
                <Link href="/legal/tos.html" className="hover:opacity-100 opacity-70">Terms of Service</Link>
            </div>
        </footer>
    );
}