import { fetchAuthorByName } from "@/db/queries/authors"
import { formatPostDate } from "@/app/utils/post-date-format"
import { getTasksByPostAndAuthor } from "@/db/queries/tasks"
import Link from "next/link"
import Image from "next/image"
import TaskList from "./utils/RollOverTaskDisplay"

export default async function HomeCardContent({ name }: { name: string }) {
    const authorWithPosts = await fetchAuthorByName(name)

    if (authorWithPosts && authorWithPosts.post && authorWithPosts.post.length > 0) {
        const firstPost = authorWithPosts.post[0]
        const postIdArray = authorWithPosts.post.map(post => post.id);
        const postId = firstPost.id

        const firstPostTasks = await getTasksByPostAndAuthor(postId, postIdArray);

        const todayTasks = firstPostTasks.filter(task => task.postId === postId)
        const rollOverTasks = firstPostTasks.filter(task => task.postId !== postId)

        return (
            <div className="w-full shadow-lg py-6 rounded-lg overflow-hidden bg-white">
                <div className="w-full flex justify-between items-center px-6">
                    <Link
                        key={authorWithPosts.id + '+' + firstPost.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}
                    >
                        <div className="text-base italic font-roboto text-gray-500">
                            {formatPostDate(firstPost.createdAt)}
                        </div>
                    </Link>

                    <Link
                        key={authorWithPosts.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}`}
                    >
                        <div className="text-xl font-medium text-accent font-rubik text-primary">
                            {name.toUpperCase()}
                        </div>
                    </Link>
                </div>

                <Link href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}>
                    <div className="w-full flex justify-center mt-6 px-6">
                        {firstPost.photo && (
                            <Image
                                src={firstPost.photo}
                                height={100}
                                width={100}
                                alt={`${name} Recent Post Photo`}
                                className="w-32 h-32 object-cover rounded-lg shadow-md"
                            />
                        )}
                        {firstPost.content && (
                            <div className="ml-6 h-32 overflow-hidden text-gray-700 text-sm">
                                {firstPost.content}
                            </div>
                        )}
                    </div>
                </Link>

                <Link href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}>
                    <div className="w-full px-6 bg-gray-50 rounded-b-lg">
                        <div className="text-lg font-roboto mb-3 text-gray-800">
                            Tasks:
                        </div>
                        <div className="rounded-lg bg-white shadow-md p-4 max-w-md h-48 overflow-auto border border-gray-200">
                            <ul className="space-y-2 text-gray-700 text-sm list-inside list-disc">
                                {todayTasks?.map((task) => {
                                    const complete = task.phase === 'complete';

                                    return (
                                        <li
                                            key={task.id}
                                            className={`${complete ? 'line-through text-gray-400' : 'text-gray-800'} font-medium`}
                                        >
                                            {task.content}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </Link>
            </div>

        )
    }

}