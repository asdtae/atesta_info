'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation'

export default function social() {
    const router = useRouter()
    router.refresh()
    
    return (
        <div>
            <Link href={"/"}>Social  APP</Link>
        </div>
    )
}