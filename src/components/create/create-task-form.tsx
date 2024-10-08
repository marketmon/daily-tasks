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
        event.preventDefault()

        setTasks([...tasks, {
            content: taskContent,
            phase: 'in progress',
            tempId: tasks.length + 1,
            postId: postId.postId
        }]);
        setTaskContent('');
    };

    const handleDeleteTask = (tempTaskId: number, event: FormEvent) => {
        event.preventDefault()


        setTasks(tasks.filter(task => task.tempId !== tempTaskId));
    };

    const handleEditTask = (tempTaskId: number, newContent: string, event: FormEvent) => {
        event.preventDefault()


        setTasks(tasks.map(task => task.tempId === tempTaskId ? { ...task, content: newContent } : task));
    };

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event?.currentTarget)

        if (tasks.length > 0) {
            const tasksWithoutTempId = tasks.map(({ tempId, ...rest }) => rest);
            formData.append('tasks', JSON.stringify(tasksWithoutTempId));

            createTask(formData)
        }

    }

    return (
        <form className="font-poppins w-full max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <div className="flex items-center space-x-3 mb-6">
                <input
                    type="text"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Type your task"
                    className="border border-gray-300 p-3 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-md shadow-md transition duration-200 ease-in-out"
                >
                    Add
                </button>
            </div>

            <div className="task-list space-y-4">
                {tasks.map(task => (
                    <div key={task.tempId} className="flex items-center space-x-3">
                        <input
                            type="text"
                            value={task.content}
                            onChange={(e) => handleEditTask(task.tempId, e.target.value, e)}
                            className="border border-gray-300 p-3 rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            onClick={(e) => handleDeleteTask(task.tempId, e)}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition duration-200 ease-in-out"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-md shadow-md transition duration-200 ease-in-out"
                >
                    Submit
                </button>
            </div>
        </form>

    )
}