import Image from "next/image";
import Link from "next/link";
import { fetchAuthorPosts } from "@/db/queries/authors";
import { formatPostDate } from "@/app/utils/post-date-format";
import { MainButton } from "@/components/buttons/buttons";

interface PostFetchProps {
    params: {
        authorName: string,
        postId: string
    },
    searchParams: {
        page?: string
    }
}

export default async function CalendarPage({ params, searchParams }: PostFetchProps) {
    const authorName = params.authorName.charAt(0).toLocaleUpperCase() + params.authorName.slice(1);
    const currentPage = Number(searchParams.page) || 1;
    const pageSize = 12;

    const authorWithPosts = await fetchAuthorPosts(authorName, currentPage, pageSize);

    if (authorWithPosts) {
        const posts = authorWithPosts.post;
        const totalPosts = authorWithPosts._count.post;
        const totalPages = Math.ceil(totalPosts / pageSize);

        if (posts) {
            return (
                <div className="">

                    <div className="mt-5">
                        <div className="font-rubik font-bold text-2xl m-5">
                            {authorName}&apos;s Posts
                        </div>
                        <div className="flex flex-col items-center mt-5">
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:w-4/5 w-11/12">
                                {posts.map((post) => (
                                    <div key={post.id} className="sm:w-32 w-24 font-roboto shadow-md hover:shadow-lg rounded">
                                        <Link
                                            key={authorName + '+' + post.id}
                                            href={`/author/${authorName.toLowerCase()}/post/${post.id}`}
                                            className=""
                                        >
                                            {post?.photo === '' ? (
                                                <div className="w-24 h-24 mt-2 object-cover mx-auto overflow-clip p-0.5 text-xs font-roboto text-center">
                                                    {post.content.substring(0, 64)}...
                                                </div>
                                            ) : (
                                                <Image
                                                    src={post?.photo}
                                                    width={128}
                                                    height={128}
                                                    alt={post.id + 'photo'}
                                                    className="w-32 aspect-square object-cover"
                                                />
                                            )}
                                            <div className="text-center py-1 text-xs font-bold font-poppins">
                                                {formatPostDate(post.createdAt)}
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex gap-2 mt-6 mb-8">
                                {currentPage > 1 && (
                                    <Link
                                        href={`/author/${authorName.toLowerCase()}/calendar?page=${currentPage - 1}`}
                                        className="px-4 py-2 border border-black rounded hover:bg-gray-100"
                                    >
                                        Previous
                                    </Link>
                                )}

                                <div className="flex items-center px-4">
                                    Page {currentPage} of {totalPages}
                                </div>

                                {currentPage < totalPages && (
                                    <Link
                                        href={`/author/${authorName.toLowerCase()}/calendar?page=${currentPage + 1}`}
                                        className="px-4 py-2 border border-black rounded hover:bg-gray-100"
                                    >
                                        Next
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}