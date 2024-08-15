import Image from "next/image";
import { fetchAuthorByName } from "@/db/queries/authors"
import { formatPostDate } from "@/app/utils/post-date-format";
import Link from "next/link";

interface PostFetchProps {
    params: {
        authorName: string,
        postId: string
    }
}

export default async function CalendarPage({ params }: PostFetchProps) {

    const authorName = params.authorName.charAt(0).toLocaleUpperCase() + params.authorName.slice(1);

    const authorWithPosts = await fetchAuthorByName(authorName)
    if (authorWithPosts) {
        const posts = authorWithPosts.post
        if (posts) {
            return (
                <div className=" mx-2 md:mx-10 my-3 p-5">
                    <div className="font-rubik text-3xl italic text-center">
                        {authorName}&apos;s Posts
                    </div>
                    <div className="flex justify-center mt-5">
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:w-4/5 w-full">
                            {posts.map((post) => {
                                return (
                                    <div key={post.id} className="w-24 font-roboto shadow hover:shadow-lg bg-white">
                                        <Link
                                            key={authorName + '+' + post.id}
                                            href={`/author/${authorName.toLowerCase()}/post/${post.id}`}
                                            className=""
                                        >

                                            {post?.photo === '' ?
                                                <div className="w-24 h-24 object-cover">

                                                </div>
                                                :
                                                <Image
                                                    src={post?.photo}
                                                    width={128}
                                                    height={128}
                                                    alt={post.id + 'photo'}
                                                    className="w-32 aspect-square object-cover"
                                                />}
                                            <div className="text-center py-1 text-xs md:text-sm">{formatPostDate(post.createdAt)}</div>
                                        </Link>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )
        }
    }
}