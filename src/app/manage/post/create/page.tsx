import { createPost } from "@/app/actions/posts";
import { formatPostDate } from "@/app/utils/post-date-format";
import { MainButton } from "@/components/buttons/buttons";
import CreatePostForm from "@/components/create/create-post-form";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth"
import Link from "next/link";



export default async function CreatePostPage() {

    const currentDate = new Date();
    const session = await getServerSession(authOptions);

    const authorId = session?.user?.id

    return (
        <div className="z-50 absolute top-0 left-0 w-screen bg-white">
            <div className=" md:mx-10 mx-2 my-3 p-5">
                <div className="w-full flex font-radley font-medium tracking-wide mb-3">
                    <div className="w-1/2">
                        <Link href="/manage">
                            <MainButton content="CANCEL" />
                        </Link>
                    </div>

                </div>
                <div className="flex items-center space-x-4">
                    <h1 className="font-bold text-3xl font-roboto text-black">
                        Create Post For:
                    </h1>
                    <span className="font-roboto text-gray-800 text-2xl bg-gray-100 px-3 py-1 rounded-md">
                        {formatPostDate(new Date()).toUpperCase()}, {currentDate.toDateString()}
                    </span>
                </div>
                <CreatePostForm formAction={createPost} initialData={{ authorId: authorId }} />
            </div>
        </div>
    )
}