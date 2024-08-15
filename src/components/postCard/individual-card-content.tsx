'use client'
import Image from "next/image"
import Link from "next/link"
import { updateTaskPhase } from "@/app/actions/tasks"

interface Author {
    name: string;
    id: string;
}

interface Task {
    content?: string;
    id?: string;
    phase?: string;
}

interface IndividualCardContentProps {
    authorName: string;
    post: {
        content?: string;
        id?: string;
        photo?: string;
        createdAt: Date;
        updatedAt: Date;
        authorId: string | null;
        author: Author | null;
        task: Task[];
    },
    isOwner: boolean;
}


export default function IndividualCardContent(props: IndividualCardContentProps) {

    const { authorName, post, isOwner } = props;

    const completedTasks = post.task.filter(task => task.phase === 'complete')
    const inProgressTasks = post.task.filter(task => task.phase === 'in progress')

    function handleClick(task: Task) {

        updateTaskPhase(task);
    }

    return (
        <div>
            <div className="w-full text-center font-bold font-rubik italic text-4xl text-accent">
                <Link
                    key={authorName}
                    href={`/author/${authorName.toLowerCase()}`}
                    className=""
                >
                    {authorName.toUpperCase()}
                </Link>
            </div>
            <div className="w-full flex justify-center">
                <div className="md:w-4/5 w-full mt-5 md:flex">
                    <div className="md:w-1/3 w-5/6 mx-auto">
                        {post.photo &&
                            <Image
                                src={post.photo}
                                height={100}
                                width={100}
                                alt="Melissa First Post Photo"
                                className="w-full aspect-square object-contain"
                            />}
                    </div>
                    <div className="md:w-2/3 md:px-10 px-1 w-5/6 mt-2 mx-auto">
                        <div className="font-roboto text-xl">
                            <div className=" text-lg font-poppins">
                                {post.content}
                            </div>
                        </div>
                        <div>
                            <div className="font-roboto text-xl font-bold mt-5">
                                Tasks:
                            </div>
                            <div className="font-normal text-lg">
                                <ul className="ml-10 list-disc">
                                    {inProgressTasks.map((task) => {
                                        return (
                                            <div key={task.id} className="font-poppins">
                                                {isOwner ?
                                                    <li onClick={() => { handleClick(task) }} className="hover:line-through hover:cursor-pointer">
                                                        {task.content}
                                                    </li>
                                                    :
                                                    <li>
                                                        {task.content}
                                                    </li>
                                                }
                                            </div>
                                        )
                                    })}
                                </ul>
                                <br></br>
                                <span className="font-bold italic text-lg font-roboto">Complete:</span>

                                <ul className="ml-10 list-disc">
                                    {completedTasks.map((task) => {
                                        return (
                                            <div key={task.id} className="font-poppins text-sm">
                                                {isOwner ?
                                                    <li onClick={() => { handleClick(task) }} className="hover:line-through hover:cursor-pointer">
                                                        {task.content}
                                                    </li>
                                                    :
                                                    <li>
                                                        {task.content}
                                                    </li>
                                                }
                                            </div>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}