import { fetchAuthorByName } from "@/db/queries/authors";
import { getAllTasks } from "@/db/queries/tasks";
import Link from "next/link";
import Image from "next/image";
import { formatPostDate } from "@/app/utils/post-date-format";

interface PostFetchProps {
    params: {
        authorName: string,
    }
}

export default async function AuthorPage({ params }: PostFetchProps) {

    const authorName = params.authorName.charAt(0).toLocaleUpperCase() + params.authorName.slice(1);
    const nameArray = ['Ethan', 'Melissa', 'Turner']

    const descriptions = {
        Ethan: 'Catch me losing in chess, grinding on the binaries, or day dreaming about data',
        Melissa: 'I am who I am and I am that well',
        Turner: 'Modeling for a couple weeks now, watch out for my beauty pose'
    }

    const otherNames = nameArray.filter(name => name != authorName)

    const authorWithPosts = await fetchAuthorByName(authorName);

    if (authorWithPosts && authorWithPosts.post && authorWithPosts.post.length > 0) {

        const postIdArray = authorWithPosts.post.map(post => post.id);

        const allTasks = await getAllTasks(postIdArray);

        const completeTasks = allTasks.filter(task => task.phase === 'complete');
        const inprogressTasks = allTasks.filter(task => task.phase === 'in progress');


        const authorKey = authorName as keyof typeof descriptions;



        return (
            <div className="mx-2 md:mx-10 my-3 p-5">
                <div className="flex items-center justify-center gap-10 font-rubik text-2xl italic text-accent text-center">
                    <Link
                        key={otherNames[0]}
                        href={`/author/${otherNames[0].toLowerCase()}`}
                        className=""
                    >
                        <div className="scale-90">
                            {otherNames[0].toUpperCase()}
                        </div>
                    </Link>
                    <div className="font-bold scale-150">
                        {authorName.toUpperCase()}
                    </div>
                    <Link
                        key={otherNames[1]}
                        href={`/author/${otherNames[1].toLowerCase()}`}
                        className=""
                    >
                        <div className="scale-90">
                            {otherNames[1].toUpperCase()}
                        </div>
                    </Link>
                </div>
                <div>
                    <div className="w-full md:flex md:justify-center flex-wrap mt-4">
                        <div className="md:w-1/3 w-full">
                            <div className="w-full flex justify-between px-2 py-1  font-poppins">
                                <div>
                                    Posts:
                                </div>
                                <Link href={`/author/${authorName.toLowerCase()}/calendar`}>
                                    <div className="font-radley">
                                        see all
                                    </div>
                                </Link>
                            </div>
                            <div className="grid grid-rows-2 grid-cols-3 gap-1 w-full p-2 mx-auto">
                                {authorWithPosts.post.map((post) => {
                                    return (
                                        <div key={post.id} className="w-24 shadow h-fit bg-white">
                                            <Link
                                                key={authorName + '+' + post.id}
                                                href={`/author/${authorName.toLowerCase()}/post/${post.id}`}
                                                className=""
                                            >
                                                {post?.photo === '' ?
                                                    <div className="w-24 h-24 aspect-square">

                                                    </div>
                                                    :
                                                    <Image
                                                        src={post?.photo}
                                                        width={96}
                                                        height={96}
                                                        alt={post.id + 'photo'}
                                                        className="w-24 aspect-square object-cover"
                                                    />}
                                                <div className="text-xs text-center text-black py-1">{formatPostDate(post.createdAt)}</div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="md:w-1/3 w-full ">
                            <Image
                                src={authorWithPosts.photo}
                                height={100}
                                width={100}
                                alt="Ethan First Post Photo"
                                className="w-60 aspect-square mx-auto"
                            />
                        </div>
                        <div className="md:w-1/3 w-full p-3 font-poppins flex bg-accent text-white text-center items-center">
                            {descriptions[authorKey]}
                        </div>
                    </div>
                </div>
                <div className="relative w-full flex-wrap font-poppins  mt-5">
                    <div className="h-96 overflow-y-scroll">
                        <div className="font-bold">Completed Tasks:</div>
                        <ul className="ml-2 list-disc">
                            {completeTasks?.map((task) => {
                                return (
                                    <li key={task.id}>
                                        - {task.content}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="mt-5 max-h-96 overflow-y-scroll">
                        <div className="font-bold">Outstanding Tasks:</div>
                        <ul className="ml-2 list-disc">
                            {inprogressTasks?.map((task) => {
                                return (
                                    <li key={task.id}>
                                        - {task.content}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}