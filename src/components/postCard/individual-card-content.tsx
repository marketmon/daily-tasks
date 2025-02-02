'use client'
import Image from "next/image"
import Link from "next/link"
import { updateTaskPhase } from "@/app/actions/tasks"
import { useState } from 'react'

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

export default function IndividualCardContent({ authorName, post, isOwner }: IndividualCardContentProps) {
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const completedTasks = post.task.filter(task => task.phase === 'complete');
    const inProgressTasks = post.task.filter(task => task.phase === 'in progress');

    async function handleTaskUpdate(task: Task) {
        if (!task.id || isUpdating) return;

        setIsUpdating(task.id);
        try {
            await updateTaskPhase(task);
        } catch (error) {
            console.error('Failed to update task:', error);
        } finally {
            setIsUpdating(null);
        }
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-6">
                {/* Author Header */}
                <Link
                    href={`/author/${authorName.toLowerCase()}`}
                    className="block text-center mb-8"
                >
                    <h1 className="font-rubik italic text-4xl text-accent hover:opacity-80 transition-opacity">
                        {authorName.toUpperCase()}
                    </h1>
                </Link>

                {/* Content Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Image Section */}
                    {post.photo && (
                        <div className="md:col-span-1">
                            <Image
                                src={post.photo}
                                height={400}
                                width={400}
                                alt={`Photo by ${authorName}`}
                                className="w-full rounded-lg object-cover"
                            />
                        </div>
                    )}

                    {/* Content and Tasks Section */}
                    <div className={`${post.photo ? 'md:col-span-2' : 'md:col-span-3'}`}>
                        {/* Post Content */}
                        {post.content && (
                            <div className="mb-8">
                                <div className="font-roboto text-xl">
                                    <div className="font-poppins text-lg text-gray-700">
                                        {post.content}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tasks Section */}
                        <div>
                            {/* In Progress Tasks */}
                            <div className="font-roboto text-xl font-bold mb-4">
                                Tasks:
                            </div>
                            <div className="space-y-4">
                                {/* In Progress Tasks */}
                                <div className="bg-gray-50 rounded p-4">
                                    <h2 className="font-roboto text-xl font-bold text-gray-800 mb-4">
                                        In Progress
                                    </h2>
                                    <ul className="space-y-2">
                                        {inProgressTasks.map((task) => (
                                            <li
                                                key={task.id}
                                                className={`font-poppins text-lg ${isOwner ? 'cursor-pointer' : ''
                                                    }`}
                                            >
                                                <div
                                                    onClick={() => isOwner && handleTaskUpdate(task)}
                                                    className={`p-2 rounded ${isOwner ? 'hover:bg-gray-100' : ''
                                                        } ${isUpdating === task.id ? 'opacity-50' : ''
                                                        }`}
                                                >
                                                    • {task.content}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Completed Tasks */}
                                <div className="bg-gray-50 rounded p-4">
                                    <h2 className="font-roboto text-xl font-bold text-gray-800 mb-4">
                                        Complete
                                    </h2>
                                    <ul className="space-y-2">
                                        {completedTasks.map((task) => (
                                            <li
                                                key={task.id}
                                                className={`font-poppins text-base text-gray-500 line-through ${isOwner ? 'cursor-pointer' : ''
                                                    }`}
                                            >
                                                <div
                                                    onClick={() => isOwner && handleTaskUpdate(task)}
                                                    className={`p-2 rounded ${isOwner ? 'hover:bg-gray-100' : ''
                                                        } ${isUpdating === task.id ? 'opacity-50' : ''
                                                        }`}
                                                >
                                                    • {task.content}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}