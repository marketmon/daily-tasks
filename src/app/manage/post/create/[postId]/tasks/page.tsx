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
        <div className="z-50 absolute top-0 left-0 bg-base w-screen">
            <div className="bg-white border-4 border-accent mx-10 my-3 p-5">
                <Link href="/manage">
                    <div className="bg-accent w-fit p-2 text-white text-sm flex justify-center items-center h-8">
                        CANCEL
                    </div>
                </Link>
                <div className="mt-10">
                    Add a task:
                    <CreateTaskForm postId={postId} />
                </div>
            </div>
        </div>
    )
}