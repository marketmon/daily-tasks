import { formatPostDate } from "@/app/utils/post-date-format";
import { fetchAuthorByName } from "@/db/queries/authors";
import Link from "next/link";

interface PostFetchProps {
    authorName: string;
    postId: string;

}

export default async function SinglePostLayout(
    {
        children,
        params,
    }: Readonly<{
        children: React.ReactNode;
        params: PostFetchProps;
    }>
) {

    const authorName = params.authorName.charAt(0).toLocaleUpperCase() + params.authorName.slice(1);
    const postId = params.postId

    const authorWithPosts = await fetchAuthorByName(authorName);

    if (authorWithPosts && authorWithPosts.post && authorWithPosts.post.length > 0) {
        const postIdArray = authorWithPosts.post.map(post => post.id);

        const index = postIdArray.indexOf(postId);
        const desiredPost = authorWithPosts.post[index]
        const postArray = authorWithPosts.post

        const postSliceAfter = postArray.slice(index + 1);
        const postSliceBefore = postArray.slice(0, index);

        return (
            <div className="bg-white border-4 border-accent mx-3 my-1 p-2 md:mx-10 md:my-3 md:p-5">
                <div className="flex items-center w-full justify-center overflow-hidden">
                    <div className="w-1/3 mr-3 italic font-radley text-lg gap-3 overflow-clip text-nowrap">
                        {postSliceBefore.length > 0 && <div className="">
                            {postSliceBefore.map((post) => {
                                return (
                                    <Link
                                        key={authorWithPosts.id + '+' + post.id}
                                        href={`/author/${authorWithPosts.name.toLowerCase()}/post/${post.id}`}
                                        className="mr-2"
                                    >
                                        {formatPostDate(post.createdAt)}
                                    </Link>
                                )
                            })}
                        </div>}
                    </div>

                    <div className="font-radley md:text-2xl font-bold w-1/3 text-center">
                        {formatPostDate(desiredPost.createdAt)}
                    </div>
                    <div className="w-1/3 italic font-radley ml-3 md:text-lg gap-3 text-nowrap flex justify-start">
                        {postSliceAfter.length > 0 && <div>
                            {postSliceAfter.map((post) => {
                                return (
                                    <Link
                                        key={authorWithPosts.id + '+' + post.id}
                                        href={`/author/${authorWithPosts.name.toLowerCase()}/post/${post.id}`}
                                        className="ml-3"
                                    >
                                        {formatPostDate(post.createdAt)}
                                    </Link>
                                )
                            })}
                        </div>}
                    </div>
                </div>
                {children}
            </div>
        )
    }
}