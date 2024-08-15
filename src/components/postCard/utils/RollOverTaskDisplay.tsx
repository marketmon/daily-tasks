'use client'
import { useState, useEffect } from 'react';
import { formatPostDate } from '@/app/utils/post-date-format';
import Link from 'next/link';

interface Task {
    id: string;
    content: string;
    phase: string;
    createdAt: Date;
    updatedAt: Date;
    postId: string | null;
}

interface Props {
    rollOverTasks: Task[];
    authorName: string;
}

const TaskList: React.FC<Props> = ({ rollOverTasks, authorName }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                prevIndex + 1 >= rollOverTasks.length ? 0 : prevIndex + 1
            );
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [rollOverTasks]);

    return (
        <ul className="ml-2">
            {rollOverTasks.length > 0 ?
                <div>
                    {rollOverTasks
                        .slice(currentIndex, currentIndex + 1)
                        .map((task) => (
                            <li key={task.id} className="list-disc">
                                <Link
                                    href={`/author/${authorName.toLowerCase()}/post/${task.postId}`}
                                >
                                    {task.content}
                                    <br />
                                    <div className="text-xs italic ml-3">
                                        from {formatPostDate(task.createdAt)}
                                    </div>
                                </Link>
                            </li>
                        ))}
                </div> :
                <div className="text-center text-xs">
                    none to report
                </div>
            }
        </ul>
    );
};

export default TaskList;