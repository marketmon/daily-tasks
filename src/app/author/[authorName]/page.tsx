import { fetchAuthorByName } from "@/db/queries/authors";
import { getAllTasks } from "@/db/queries/tasks";
import Link from "next/link";
import Image from "next/image";
import { formatPostDate } from "@/app/utils/post-date-format";
import { SmallButton } from "@/components/buttons/buttons";

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
            <div className="mx-4 md:mx-12 p-6 bg-gray-50 rounded-lg shadow-lg">
                {/* Author Names Section */}
                <div className="flex items-center justify-center gap-8 font-rubik text-2xl italic text-accent text-center">
                    <Link
                        key={otherNames[0]}
                        href={`/author/${otherNames[0].toLowerCase()}`}
                        className="hover:underline transition duration-300"
                    >
                        <div className="hover:scale-95 transform transition duration-300">
                            {otherNames[0].toUpperCase()}
                        </div>
                    </Link>
                    <div className="font-bold text-3xl text-accent-dark">
                        {authorName.toUpperCase()}
                    </div>
                    <Link
                        key={otherNames[1]}
                        href={`/author/${otherNames[1].toLowerCase()}`}
                        className="hover:underline transition duration-300"
                    >
                        <div className="hover:scale-95 transform transition duration-300">
                            {otherNames[1].toUpperCase()}
                        </div>
                    </Link>
                </div>

                {/* Posts and Image Section */}
                <div className="w-full md:flex md:justify-center flex-wrap mt-6 gap-8">
                    {/* Post section */}
                    <div className="md:w-1/3 w-full">
                        <div className="flex justify-between items-center px-4 py-2 bg-accent text-white rounded-md">
                            <div className="font-bold">Posts:</div>
                            <Link href={`/author/${authorName.toLowerCase()}/calendar`}>
                                <SmallButton content="See All" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mt-4 max-h-72 overflow-y-auto rounded-lg">
                            {authorWithPosts.post.slice(0, 6).map((post) => (
                                <div
                                    key={post.id}
                                    className="w-full h-32 shadow-md border border-gray-300 rounded overflow-hidden"
                                >
                                    <Link href={`/author/${authorName.toLowerCase()}/post/${post.id}`}>
                                        {post?.photo === '' ? (
                                            <div className="w-full h-24 bg-gray-200 flex items-center justify-center text-xs font-roboto text-gray-700 p-2">
                                                {post.content.substring(0, 50)}...
                                            </div>
                                        ) : (
                                            <Image
                                                src={post?.photo}
                                                width={72}
                                                height={72}
                                                alt={post.id + 'photo'}
                                                className="h-24 w-full object-cover"
                                            />
                                        )}
                                        <div className="text-center text-gray-700 py-2 text-xs">
                                            {formatPostDate(post.createdAt)}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Author Image */}
                    <div className="md:w-1/3 w-full flex justify-center mt-4 md:mt-0">
                        <Image
                            src={authorWithPosts.photo}
                            height={150}
                            width={150}
                            alt="Author Photo"
                            className="w-48 h-48 rounded-full object-contain shadow-lg"
                        />
                    </div>

                    {/* Description Section */}
                    <div className="md:w-1/3 w-full p-6 bg-accent text-white rounded-lg flex justify-center items-center text-center">
                        {descriptions[authorKey]}
                    </div>
                </div>

                {/* Task Lists */}
                <div className="w-full mt-8 space-y-6">
                    {/* Completed Tasks */}
                    <div className="max-h-48 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="font-bold mb-2">Completed Tasks:</div>
                        <ul className="ml-4 list-disc">
                            {completeTasks?.map((task) => (
                                <li key={task.id} className="text-sm">
                                    {task.content}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Outstanding Tasks */}
                    <div className="max-h-48 overflow-y-auto bg-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="font-bold mb-2">Outstanding Tasks:</div>
                        <ul className="ml-4 list-disc">
                            {inprogressTasks?.map((task) => (
                                <li key={task.id} className="text-sm">
                                    {task.content}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}