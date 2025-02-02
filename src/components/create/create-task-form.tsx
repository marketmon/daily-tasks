'use client'
import { createTask } from "@/app/actions/tasks";
import { FormEvent, useState } from "react";

interface Task {
    content: string;
    phase: string;
    tempId: number;
    postId: string;
}

interface PostId {
    postId: string;
}

export default function CreateTaskForm(postId: PostId) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskContent, setTaskContent] = useState('');

    const handleAddTask = (event: FormEvent) => {
        event.preventDefault();
        if (!taskContent.trim()) return;

        setTasks([...tasks, {
            content: taskContent,
            phase: 'in progress',
            tempId: tasks.length + 1,
            postId: postId.postId
        }]);
        setTaskContent('');
    };

    const handleDeleteTask = (tempTaskId: number, event: FormEvent) => {
        event.preventDefault();
        setTasks(tasks.filter(task => task.tempId !== tempTaskId));
    };

    const handleEditTask = (tempTaskId: number, newContent: string, event: FormEvent) => {
        event.preventDefault();
        setTasks(tasks.map(task =>
            task.tempId === tempTaskId ? { ...task, content: newContent } : task
        ));
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event?.currentTarget);

        if (tasks.length > 0) {
            const tasksWithoutTempId = tasks.map(({ tempId, ...rest }) => rest);
            formData.append('tasks', JSON.stringify(tasksWithoutTempId));
            createTask(formData);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <form className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8" onSubmit={handleSubmit}>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Create Tasks</h2>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={taskContent}
                            onChange={(e) => setTaskContent(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 px-4 py-3 text-gray-700 bg-gray-50 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        />
                        <button
                            onClick={handleAddTask}
                            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            Add Task
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {tasks.map(task => (
                        <div
                            key={task.tempId}
                            className="group flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        >
                            <input
                                type="text"
                                value={task.content}
                                onChange={(e) => handleEditTask(task.tempId, e.target.value, e)}
                                className="flex-1 px-4 py-2 bg-white rounded-md border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                            />
                            <button
                                onClick={(e) => handleDeleteTask(task.tempId, e)}
                                className="px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>

                {tasks.length > 0 && (
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
                        >
                            Save All Tasks
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}