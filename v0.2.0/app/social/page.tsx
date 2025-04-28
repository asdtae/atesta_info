import { Quicksand } from 'next/font/google';
import { Varela_Round } from "next/font/google";
import PostEditor from "@/app/social/editor/postEditor";
import Post from "@/app/social/posts/post";
//import Sidebar from "@/app/social/sidebar/sidebar";

const quicksand = Quicksand({
    weight: ['400'],
    subsets: ['latin']
})

const varela_round = Varela_Round({
    weight: ['400'],
    subsets: ['latin']
})



export default async function Social() {
    const baseUrl = 'http://localhost:3000';
    const data = await fetch(`${baseUrl}/api/chat/getPosts`).then(res => res.json());
    const posts = Array.isArray(data.posts) ? data.posts : [];

    return (
        <div className={`${quicksand.className} min-h-screen
             bg-gradient-to-br
                 from-[#00A878] to-[#A57548] relative overflow-hidden`}>
            <div className={`flex gap-5 justify-center mt-[8%] mb-[8%]`}>
                <div className={`sticky top-[0.25rem] md:block lg:w-80 w-72 h-fit flex-none space-y-5`}></div>
                <div className={`px-6 w-[45rem]`}>
                    <PostEditor />
                    <div className="mt-6">
                        {posts.map((post: any) => (
                            <Post key={post.id} post={post} />
                        ))}
                    </div>
                </div>
                {/* <Sidebar /> */}
            </div>
        </div>
    )
}