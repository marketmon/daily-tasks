import { fetchAuthorByName } from "@/db/queries/authors"
import { formatPostDate } from "@/app/utils/post-date-format"
import { getTasksByPostAndAuthor } from "@/db/queries/tasks"
import Link from "next/link"
import Image from "next/image"
import { SmallButton } from "../buttons/buttons"
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
            <div className="w-full bg-white h-96 overflow-y-scroll">

                <div className="w-full flex justify-between items-center p-1">
                    <div className="w-1/4">

                    </div>
                    <Link
                        key={authorWithPosts.id + '+' + firstPost.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}
                        className=""
                    >
                        <div className="text-xl italic text-center">
                            {formatPostDate(firstPost.createdAt)}
                        </div>
                    </Link>
                    <Link
                        key={authorWithPosts.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}/calendar`}
                        className=""
                    >
                        <SmallButton content="ALL POSTS" />
                    </Link>
                </div>
                <Link
                    key={authorWithPosts.id}
                    href={`/author/${authorWithPosts.name.toLowerCase()}`}
                    className=""
                >
                    <div className="text-center text-3xl font-rubik font-bold text-accent italic">
                        {name.toUpperCase()}
                    </div>
                </Link>
                <div className="w-full flex justify-center">
                    {firstPost.photo && <Image
                        src={firstPost.photo}
                        height={100}
                        width={100}
                        alt={`${name} Recent Post Photo`}
                        className="w-32 aspect-square object-cover"
                    />}
                </div>
                <div className="w-full p-3">
                    <div className="text-xl font-roboto font-bold text-accent">Tasks:</div>
                    <div>
                        <ul className="ml-2 text-balance">
                            {todayTasks?.map((task) => {
                                const complete = task.phase === 'complete'

                                return (
                                    <li key={task.id} className={`${complete && 'line-through'}`}>
                                        {task.content}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="mt-3">
                        <div className="text-md font-roboto font-bold text-accent italic">Roll Over:</div>
                        <ul className="ml-2">
                            <TaskList rollOverTasks={rollOverTasks} authorName={authorWithPosts.name} />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }

}