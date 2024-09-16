import { getServerSession } from "next-auth";
import Link from "next/link";
import { fetchAuthorByName } from "@/db/queries/authors";
import Image from "next/image";
import { formatPostDate } from "../utils/post-date-format";
import { authOptions } from "@/lib/auth";
import { MainButton } from "@/components/buttons/buttons";

export default async function Manage() {

    const session = await getServerSession(authOptions);

    if (session) {

        const authorWithPosts = await fetchAuthorByName(session.user.name)

        if (authorWithPosts) {

            const posts = authorWithPosts.post

            return (
                <div className="z-50 absolute top-0 left-0 bg-base w-screen">
                    <div className="w-full p-3 flex font-radley font-medium tracking-wide">
                        <div className="w-1/2">
                            <Link href='/'>
                                <MainButton content="HOME" />
                            </Link>
                        </div>


                    </div>
                    <div className="mx-2 md:mx-10 my-3 p-1">

                        <div className="text-3xl font-roboto font-bold text-center">
                            MANAGE POSTS
                        </div>
                        <div className=" w-full flex justify-start">
                            <Link href='/manage/post/create'>
                                <MainButton content="CREATE" />
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="font-roboto font-bold text-xl">
                                EDIT POSTS
                            </div>
                            <div className="flex justify-center mt-5">
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:w-4/5 w-full">
                                    {posts?.map((post) => {
                                        return (
                                            <div key={post.id} className="sm:w-32 w-24 font-roboto shadow hover:shadow-lg rounded border-black border-2">
                                                <Link
                                                    key={authorWithPosts.name + '+' + post.id}
                                                    href={`/manage/post/edit/${post.id}`}
                                                    className=""
                                                >
                                                    {post?.photo === '' ?
                                                        <div className="w-24 h-24 mt-2 object-cover mx-auto
                                                overflow-clip p-0.5 text-xs font-roboto text-center">
                                                            {post.content.substring(0, 64)}...
                                                        </div>
                                                        :
                                                        <Image
                                                            src={post?.photo}
                                                            width={128}
                                                            height={128}
                                                            alt={post.id + 'photo'}
                                                            className="w-32 aspect-square object-cover"
                                                        />}
                                                    <div className="text-center py-1 text-xs font-bold font-poppins"
                                                    >{formatPostDate(post.createdAt)}</div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}