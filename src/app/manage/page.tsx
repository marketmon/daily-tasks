import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { fetchAuthorByName } from "@/db/queries/authors";
import Image from "next/image";
import { formatPostDate } from "../utils/post-date-format";

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
                                <div className="bg-accent w-fit p-2 text-white text-sm flex justify-center items-center h-8">
                                    HOME
                                </div>
                            </Link>
                        </div>


                    </div>
                    <div className="bg-white border-4 border-accent mx-2 md:mx-10 my-3 p-1 md:p-5">

                        <div className="text-3xl font-rubik text-center">
                            MANAGE POSTS
                        </div>
                        <div className=" w-full flex justify-start">
                            <Link href='/manage/post/create' className="font-radley bg-accent p-2 text-white">
                                CREATE
                            </Link>
                        </div>
                        <div className="mt-5">
                            <div className="font-roboto text-xl">EDIT POSTS</div>
                            <div className="flex justify-center mt-5">
                                <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:w-4/5 w-full">
                                    {posts?.map((post) => {
                                        return (
                                            <div key={post.id} className="w-fit shadow">
                                                <Link
                                                    key={authorWithPosts.name + '+' + post.id}
                                                    href={`/manage/post/edit/${post.id}`}
                                                    className=""
                                                >
                                                    {post?.photo === '' ?
                                                        <div className="w-24 aspect-square">

                                                        </div>
                                                        :
                                                        <Image
                                                            src={post?.photo}
                                                            width={50}
                                                            height={50}
                                                            alt={post.id + 'photo'}
                                                            className="w-24 aspect-square object-cover"
                                                        />}
                                                    <div className="font-sm text-sm text-center py-1">
                                                        {formatPostDate(post.createdAt)}
                                                    </div>
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