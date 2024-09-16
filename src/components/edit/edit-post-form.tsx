'use client';

import { deletePost, deletePostAndPhoto, updatePost } from "@/app/actions/posts";
import createTaskSimplified, { updateTasksContent, deleteTask } from "@/app/actions/tasks";
import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import Link from "next/link";

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
}

interface ChangedTask {
    id: string;
    content: string;
}

export default function EditPostForm({ post }: IndividualCardContentProps) {
    const postOriginal = post;
    const [postContent, setPostContent] = useState(postOriginal.content || '');
    const [isPostContentChanged, setIsPostContentChanged] = useState(false);
    const [taskContents, setTaskContents] = useState(() =>
        postOriginal.task.reduce((acc: { [key: string]: string }, task) => {
            if (task.id) acc[task.id] = task.content || '';
            return acc;
        }, {})
    );
    const [changedTasks, setChangedTasks] = useState<ChangedTask[]>([]);
    const [newTasks, setNewTasks] = useState<string[]>([]);
    const [deletedTasks, setDeletedTasks] = useState<string[]>([]);
    const [newTaskContent, setNewTaskContent] = useState('');
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    const handlePostContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostContent(e.target.value);
        setIsPostContentChanged(e.target.value !== postOriginal.content);
    };

    const handleTaskContentChange = (taskId: string, content: string) => {
        setTaskContents((prev) => ({ ...prev, [taskId]: content }));
        if (!newTasks.includes(taskId) && !changedTasks.some(task => task.id === taskId)) {
            setChangedTasks((prev) => [...prev, { id: taskId, content }]);
        } else {
            setChangedTasks((prev) => prev.map(task => task.id === taskId ? { id: taskId, content } : task));
        }
    };

    const handleNewTaskContentChange = (index: number, content: string) => {
        setNewTasks((prev) => {
            const updatedTasks = [...prev];
            updatedTasks[index] = content;
            return updatedTasks;
        });
    };

    const handleAddTask = () => {
        setNewTasks((prev) => [...prev, newTaskContent]);
        setNewTaskContent('');
    };

    const handleDeleteTask = (taskId: string) => {
        setTaskContents((prev) => {
            const { [taskId]: _, ...rest } = prev;
            return rest;
        });
        setChangedTasks((prev) => prev.filter((task) => task.id !== taskId));
        setDeletedTasks((prev) => [...prev, taskId]);
    };

    const handleDeleteNewTask = (index: number) => {
        setNewTasks((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        try {
            // Handle post content update
            if (isPostContentChanged && postOriginal.id) {
                formData.append('postContent', postContent);
                formData.append('postId', String(postOriginal.id));
                await updatePost(formData);
            }

            // Handle changed tasks
            if (changedTasks.length > 0) {
                formData.append('tasks', JSON.stringify(changedTasks));
                await updateTasksContent(formData);
            }

            // Handle deleted tasks
            if (deletedTasks.length > 0) {
                formData.append('deletedTasks', JSON.stringify(deletedTasks));
                await deleteTask(formData);
            }

            // Handle new tasks
            if (newTasks.length > 0) {
                const updatedArray: Task[] = newTasks.map(content => ({
                    content,
                    phase: 'in progress',
                    postId: postOriginal.id
                }));

                formData.append('newTasks', JSON.stringify(updatedArray));
                await createTaskSimplified(formData);
            }

            // Redirect after processing
            if (postOriginal?.author?.name) {
                router.push(`/author/${postOriginal.author.name}/post/${postOriginal.id}`);
            } else {
                router.push('/');
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            setError('An error occurred during form submission. Please try again.');
        }
    };

    if (postOriginal) {
        const postId = postOriginal.id;
        const photo = postOriginal.photo;

        return (
            <form onSubmit={handleSubmit}>
                {error && <div className="bg-red-500 text-white p-2 mb-4">{error}</div>}
                <div className="w-full flex justify-between">

                    <div>
                        {postId && (
                            <button
                                type="button"
                                className="bg-red-500 text-white p-2 rounded"
                                onClick={async (e) => {
                                    const confirmed = window.confirm("Are you sure you want to delete this post?");
                                    if (!confirmed) {
                                        e.preventDefault();
                                        return;
                                    }

                                    try {
                                        if (photo) {
                                            await deletePostAndPhoto(postId, photo);
                                        } else {
                                            await deletePost(postId);
                                        }
                                    } catch (err) {
                                        e.preventDefault();
                                        console.error('Error deleting post:', err);
                                        setError('An error occurred while deleting the post. Please try again.');
                                    }
                                }}
                            >
                                Delete
                            </button>
                        )}
                    </div>

                    {!photo && <Link
                        href={`/manage/post/edit/${postId}/photo`}>
                        <div className="bg-blue-500 text-white px-2">
                            UPLOAD PHOTO
                        </div>
                    </Link>}

                    <button type="submit" className="bg-green-500 text-white p-2 rounded">
                        Save
                    </button>
                </div>
                <div className="mt-5">
                    <div className="mt-5">
                        Description:
                        <textarea
                            value={postContent}
                            onChange={handlePostContentChange}
                            className="border w-full mt-2 p-2 rounded h-32"
                        />
                    </div>
                    <div className="mt-5">
                        Existing Tasks:
                        {Object.entries(taskContents).map(([taskId, content]) => (
                            <div key={taskId} className="mt-2 flex items-center">
                                <input
                                    type="text"
                                    value={content}
                                    onChange={(e) => handleTaskContentChange(taskId, e.target.value)}
                                    className="border w-full p-2 rounded"
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 text-white h-8 w-8 rounded ml-2"
                                    onClick={() => handleDeleteTask(taskId)}
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        New Tasks:
                        {newTasks.map((content, index) => (
                            <div key={index} className="mt-2 flex items-center">

                                <input
                                    type="text"
                                    value={content}
                                    onChange={(e) => handleNewTaskContentChange(index, e.target.value)}
                                    className="border w-full p-2 rounded"
                                />
                                <button
                                    type="button"
                                    className="bg-red-500 text-white h-8 w-8 ml-2 rounded"
                                    onClick={() => handleDeleteNewTask(index)}
                                >
                                    X
                                </button>

                            </div>
                        ))}
                        <div className="mt-2">
                            <input
                                type="text"
                                value={newTaskContent}
                                onChange={(e) => setNewTaskContent(e.target.value)}
                                className="border w-full p-2 rounded"
                                placeholder="New task content"
                            />
                            <button
                                type="button"
                                className="bg-blue-500 text-white p-2 mr-2 mt-2 rounded"
                                onClick={handleAddTask}
                            >
                                Add
                            </button>

                        </div>
                    </div>
                </div>
            </form>
        );
    }

    return null;
}
