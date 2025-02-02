import { MainButton } from "@/components/buttons/buttons";
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
            <div className="z-50 absolute top-0 left-0 bg-white w-screen">
                <div className="p-2">
                    <Link href="/manage" className="">
                        <MainButton content="CANCEL" />
                    </Link>
                </div>
                <div className="md:mx-10 mx-2 my-3">
                    <EditPostForm post={post} />
                </div>
            </div>
        )
    }
}