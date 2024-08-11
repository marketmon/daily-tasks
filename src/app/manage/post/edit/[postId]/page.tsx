import EditPostForm from "@/components/edit/edit-post-form";
import { fetchPost } from "@/db/queries/posts";
import Link from "next/link";

interface PostFetchProps {
    params: {
        postId: string
    }
}

export default async function EditPage({ params }: PostFetchProps) {

    const postId = params.postId
    const post = await fetchPost(postId);

    if (post) {
        return (
            <div className="z-50 absolute top-0 left-0 bg-base w-screen">
                <Link href="/manage" className="w-fit">
                    <button className="tracking-wide font-radley px-2 pt-2">
                        CANCEL
                    </button>
                </Link>
                <div className="bg-white border-4 border-accent mx-10 my-3 p-5">
                    <EditPostForm post={post} />
                </div>
            </div>
        )
    }
}