import {Suspense} from "preact/compat";
import {Loader2} from "lucide-react";
import {unstable_cache} from "next/cache";
import Link from "next/link";

export default function Sidebar()
{
    return (
        <div className={`sticky top-[0.25rem] md:block lg:w-80 w-72 h-fit flex-none space-y-5 pl-20`}>
            <Suspense fallback={<Loader2 className={`animate-spin mx-auto`} />}>
                <Trending />
            </Suspense>
        </div>
    );
}

function formatNumber(num: number): string {
    return Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(num);
}

const getTrending = unstable_cache(
    async () => {
        const baseUrl = 'http://localhost:3000';
        const data = await fetch(`${baseUrl}/api/chat/stats`).then(res => res.json());
        const result = Array.isArray(data.result) ? data.result : [];

        return result.map(row => ({
            hashtag: row.hashtag,
            count: Number(row.count),
        }));
    },
    ["trending"],
    {
        revalidate: 3 * 60 * 60,
    }
);

async function Trending() {
    const trending = await getTrending();

    return (
        <div className={`space-y-5 rounded-2xl bg-[white] p-5 shadow-sm`}>
            <div className={`text-xl font-bold`}>
                Trending Hashtags
            </div>
            {trending.map(({hashtag, count}) => {
                const title = hashtag.split("#")[1];

                return <Link key={title} href={`/hashtags/${title}`} className={`block`}>
                    <p className={`line-clamp-1 break-all font-semibold hover:underline`} title={hashtag}>{hashtag}</p>
                    <p className={`text-sm text-muted-foreground`}>{formatNumber(count)}</p>
                </Link>;
            })}
        </div>
    )
}