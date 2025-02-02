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

    // ... (keeping all the handler functions unchanged)
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
        if (!newTaskContent.trim()) return;
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
            if (isPostContentChanged && postOriginal.id) {
                formData.append('postContent', postContent);
                formData.append('postId', String(postOriginal.id));
                await updatePost(formData);
            }

            if (changedTasks.length > 0) {
                formData.append('tasks', JSON.stringify(changedTasks));
                await updateTasksContent(formData);
            }

            if (deletedTasks.length > 0) {
                formData.append('deletedTasks', JSON.stringify(deletedTasks));
                await deleteTask(formData);
            }

            if (newTasks.length > 0) {
                const updatedArray: Task[] = newTasks.map(content => ({
                    content,
                    phase: 'in progress',
                    postId: postOriginal.id
                }));

                formData.append('newTasks', JSON.stringify(updatedArray));
                await createTaskSimplified(formData);
            }

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

    if (!postOriginal) return null;

    const postId = postOriginal.id;
    const photo = postOriginal.photo;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                            {error}
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-semibold text-gray-800">Edit Post</h1>
                        <div className="flex gap-3">
                            {postId && (
                                <button
                                    type="button"
                                    className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors duration-200"
                                    onClick={async () => {
                                        const confirmed = window.confirm("Are you sure you want to delete this post?");
                                        if (!confirmed) return;

                                        try {
                                            if (photo) {
                                                await deletePostAndPhoto(postId, photo);
                                            } else {
                                                await deletePost(postId);
                                            }
                                        } catch (err) {
                                            console.error('Error deleting post:', err);
                                            setError('An error occurred while deleting the post. Please try again.');
                                        }
                                    }}
                                >
                                    Delete Post
                                </button>
                            )}

                            {!photo && (
                                <Link
                                    href={`/manage/post/edit/${postId}/photo`}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Upload Photo
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                value={postContent}
                                onChange={handlePostContentChange}
                                className="w-full h-32 px-4 py-3 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
                                placeholder="Enter post description..."
                            />
                        </div>

                        <div>
                            <h2 className="text-lg font-medium text-gray-800 mb-4">Existing Tasks</h2>
                            <div className="space-y-3">
                                {Object.entries(taskContents).map(([taskId, content]) => (
                                    <div key={taskId} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={content}
                                            onChange={(e) => handleTaskContentChange(taskId, e.target.value)}
                                            className="flex-1 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                            onClick={() => handleDeleteTask(taskId)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-medium text-gray-800 mb-4">New Tasks</h2>
                            <div className="space-y-3">
                                {newTasks.map((content, index) => (
                                    <div key={index} className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={content}
                                            onChange={(e) => handleNewTaskContentChange(index, e.target.value)}
                                            className="flex-1 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        />
                                        <button
                                            type="button"
                                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                            onClick={() => handleDeleteNewTask(index)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={newTaskContent}
                                        onChange={(e) => setNewTaskContent(e.target.value)}
                                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                        placeholder="Enter new task content..."
                                    />
                                    <button
                                        type="button"
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                                        onClick={handleAddTask}
                                    >
                                        Add Task
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}