import { getServerSession } from "next-auth";
import Link from "next/link";
import { fetchAuthorPosts } from "@/db/queries/authors";
import Image from "next/image";
import { formatPostDate } from "../utils/post-date-format";
import { authOptions } from "@/lib/auth";
import { MainButton } from "@/components/buttons/buttons";

export default async function Manage({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    const session = await getServerSession(authOptions);
    const currentPage = Number(searchParams.page) || 1;
    const pageSize = 12;

    if (session) {
        const authorWithPosts = await fetchAuthorPosts(session.user.name, currentPage, pageSize);

        if (authorWithPosts) {
            const totalPosts = authorWithPosts._count.post;
            const totalPages = Math.ceil(totalPosts / pageSize);

            return (
                <div className="z-50 absolute top-0 left-0 bg-white w-screen">
                    <div className="w-full p-3 flex justify-between  font-medium tracking-wide">
                        <Link href='/'>
                            <MainButton content="Home" />
                        </Link>
                        <Link href='/manage/post/create'>
                            <MainButton content="Create" />
                        </Link>

                    </div>
                    <div className="mt-5">
                        <div className="font-rubik font-bold text-2xl m-5">
                            Edit Posts
                        </div>
                        <div className="flex flex-col items-center mt-5">
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-1 md:w-4/5 w-7/8">
                                {authorWithPosts.post?.map((post) => (
                                    <div key={post.id} className="sm:w-32 w-24 font-roboto shadow-md hover:shadow-lg rounded">
                                        <Link
                                            key={authorWithPosts.name + '+' + post.id}
                                            href={`/manage/post/edit/${post.id}`}
                                            className=""
                                        >
                                            {post?.photo === '' ?
                                                <div className="w-24 h-24 mt-2 object-cover mx-auto overflow-clip p-0.5 text-xs font-roboto text-center">
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
                                        href={`/manage?page=${currentPage - 1}`}
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
                                        href={`/manage?page=${currentPage + 1}`}
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