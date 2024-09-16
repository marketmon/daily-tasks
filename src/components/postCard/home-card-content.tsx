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
            <div className="w-full border-2 border-black shadow-lg py-5 h-max-96 rounded overflow-hidden">

                <div className="w-full flex justify-between items-center px-5">
                    <Link
                        key={authorWithPosts.id + '+' + firstPost.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}
                        className=""
                    >
                        <div className="text-lg italic text-center font-roboto">
                            {formatPostDate(firstPost.createdAt)}
                        </div>
                    </Link>

                    <Link
                        key={authorWithPosts.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}`}
                        className=""
                    >
                        <div className="text-center text-2xl font-rubik font-bold text-accent italic">
                            {name}
                        </div>
                    </Link>

                    {/*
                    <Link
                        key={authorWithPosts.id}
                        href={`/author/${authorWithPosts.name.toLowerCase()}/calendar`}
                        className=""
                    >
                        <SmallButton content="ALL POSTS" />
                    </Link>
                    */}
                </div>

                <Link
                    href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}>
                    <div className="w-full flex justify-center mt-5 px-3">
                        {firstPost.photo && <Image
                            src={firstPost.photo}
                            height={100}
                            width={100}
                            alt={`${name} Recent Post Photo`}
                            className="w-32 aspect-square object-cover rounded"
                        />}
                        {firstPost.content && <div className="h-32 truncate text-wrap px-5 text-sm">
                            {firstPost.content}
                        </div>}
                    </div>
                </Link>
                <Link
                    href={`/author/${authorWithPosts.name.toLowerCase()}/post/${firstPost.id}`}>
                    <div className="w-full p-3" >
                        <div className="text-lg font-roboto font-bold ">
                            Tasks:
                        </div>
                        <div>
                            <ul className="ml-10 text-balance h-32 list-disc text-sm">
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
                        {/*
                    <div className="mt-3 h-24 overflow-hidden">
                        <div className="text-md font-roboto font-bold text-accent italic">Roll Over:</div>
                        <ul className="ml-2">
                            <TaskList rollOverTasks={rollOverTasks} authorName={authorWithPosts.name} />
                        </ul>
                    </div>
                    */}
                    </div>
                </Link>

            </div >
        )
    }

}