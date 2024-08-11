import { authOptions } from "@/lib/auth";
import IndividualCardContent from "@/components/postCard/individual-card-content";
import { fetchPost } from "@/db/queries/posts";
import { getServerSession } from "next-auth";


interface PostFetchProps {
    params: {
        authorName: string,
        postId: string
    }
}

export default async function FullPost({ params }: PostFetchProps) {

    const authorName = params.authorName.charAt(0).toLocaleUpperCase() + params.authorName.slice(1);
    const postId = params.postId

    const post = await fetchPost(postId);
    const session = await getServerSession(authOptions);



    if (post) {

        const isOwner = session?.user?.id === post.authorId


        return (
            <div className="w-full">
                <IndividualCardContent authorName={authorName} post={post} isOwner={isOwner} />
            </div>
        )
    }


}