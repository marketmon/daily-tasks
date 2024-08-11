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
        <form className="font-poppins" onSubmit={handleSubmit}>
            <div className="task-input">
                <input
                    type="text"
                    value={taskContent}
                    onChange={(e) => setTaskContent(e.target.value)}
                    placeholder="Type your task"
                    className="border p-2 rounded w-1/2"
                />
                <button onClick={handleAddTask} className="bg-blue-500 text-white p-2 ml-2">Add</button>
            </div>
            <div className="task-list mt-4">
                {tasks.map(task => (
                    <div key={task.tempId} className="task-item flex items-center mb-2">
                        <input
                            type="text"
                            value={task.content}
                            onChange={(e) => handleEditTask(task.tempId, e.target.value, e)}
                            className="border p-2 flex-grow"
                        />
                        <button onClick={(e) => handleDeleteTask(task.tempId, e)} className="bg-red-500 text-white p-2 ml-2">Delete</button>
                    </div>
                ))}
            </div>
            <div className="mb-4">
                <button type="submit" className="bg-green-500 text-white p-2 ml-2">
                    Submit
                </button>
            </div>
        </form>
    )
}