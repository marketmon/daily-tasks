import { createPost } from "@/app/actions/posts";
import { formatPostDate } from "@/app/utils/post-date-format";
import CreatePostForm from "@/components/create/create-post-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import Link from "next/link";



export default async function CreatePostPage() {

    const currentDate = new Date();
    const session = await getServerSession(authOptions);

    const authorId = session?.user?.id

    return (
        <div className="z-50 absolute top-0 left-0 bg-base w-screen">
            <div className="bg-white border-4 border-accent mx-10 my-3 p-5">
                <div className="w-full flex font-radley font-medium tracking-wide mb-3">
                    <div className="w-1/2">
                        <Link href="/manage">
                            <div className="bg-accent w-fit p-2 text-white text-sm flex justify-center items-center h-8">
                                CANCEL
                            </div>
                        </Link>
                    </div>

                </div>
                <div className="font-rubik font-bold text-3xl italic text-accent">
                    CREATE POST FOR:
                    <span className="font-roboto text-black ml-3 text-2xl">{formatPostDate(new Date()).toUpperCase()}, {currentDate.toDateString()}</span>
                </div>
                <CreatePostForm formAction={createPost} initialData={{ authorId: authorId }} />
            </div>
        </div>
    )
}