import { Post as PostData } from "@/types/post";
import Link from "next/link";
import {formatDate, formatDistanceToNowStrict} from "date-fns";

interface PostProps {
    post: PostData,
}

function relativeDate(from: Date) {
    const currentDate = new Date();

    if(currentDate.getTime() - from.getTime() < 24 * 60 * 60 * 1000) {
        return formatDistanceToNowStrict(from, { addSuffix: true });
    }
    else {
        if(currentDate.getFullYear() === from.getFullYear()) {
            return formatDate(from, "MMM d");
        } else {
            return formatDate(from, "yyyy MMM d");
        }
    }
}

export default function Post({ post }: PostProps) {
    return (
        <dir className={`flex flex-col items-center justify-center`}>
            <article className="space-y-3 rounded-2xl p-5 bg-white rounded-lg shadow-md mb-6 w-[36rem]">
                <div className="flex flex-wrap gap-3 items-center mb-2">
                    <Link href={`/users/${post.name}`}>
                        {post.pfp && (
                            <img
                                src={post.pfp}
                                alt={post.name}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                    </Link>
                    <div>
                        <Link href={`/users/${post.name}`}>
                            <span className="block font-medium hover:underline">{post.name}</span>
                        </Link>
                        <Link href={`/posts/${post.id}`} className="block font-sm text-muted-foreground hover:underline">
                            {relativeDate(new Date(post.created_at))}
                        </Link>
                    </div>
                </div>
                <p className={`whitespace-pre-line break-words`}>{post.content}</p>
            </article>
        </dir>
    );
}