import { MainButton } from "@/components/buttons/buttons";
import CreateTaskForm from "@/components/create/create-task-form";
import Link from "next/link";

interface PostsFetchProps {
    params: {
        postId: string;
    };
}

export default function CreateTasksPage({ params }: PostsFetchProps) {

    const postId = params.postId

    return (
        <div className="z-50 absolute top-0 left-0 w-screen bg-white">
            <div className=" md:mx-10 mx-2 my-3 md:p-5 p-2">
                <Link href="/manage">
                    <MainButton content="CANCEL" />
                </Link>
                <div className="mt-10 font-roboto">
                    <div className="text-2xl text-center font-rubik">Add a task:</div>
                    <CreateTaskForm postId={postId} />
                </div>
            </div>
        </div>
    )
}