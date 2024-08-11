'use server'

// Import the database client and the Post type from Prisma
import { db } from '@/db'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the post using Zod
const TaskSchema = z.object({
    // the title must be a string between 3 and 255 characters
    // the content must be a string between 10 and 4000 characters
    content: z.string().min(3).max(400),
    phase: z.string()
})

// Define an interface for the form state
interface TaskFormState {
    errors: {
        content?: string[],
        phase?: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a post
export async function createTask(formData: FormData): Promise<TaskFormState> {

    try {
        // Extract and parse the tasks from formData
        const tasksString = formData.get('tasks') as string;
        const tasks = JSON.parse(tasksString) as Array<{
            content: string;
            phase: string;
            postId: string;
        }>;


        // Validate each task using the Zod schema
        const errors: TaskFormState['errors'][] = [];
        const validTasks: typeof tasks = [];

        tasks.forEach((task, index) => {
            const result = TaskSchema.safeParse(task);
            if (result.success) {
                validTasks.push(task);
            } else {
                errors.push({
                    content: result.error.formErrors.fieldErrors.content,
                    phase: result.error.formErrors.fieldErrors.phase,
                });
            }
        });

        // If there are validation errors, return them
        if (errors.length > 0) {
            return {
                errors: {
                    content: errors.map(err => err.content).flat().filter((error): error is string => !!error),
                    phase: errors.map(err => err.phase).flat().filter((error): error is string => !!error),
                },
            };
        }

        // Use Prisma's createMany to insert the valid tasks
        await db.task.createMany({
            data: validTasks,
        })

    } catch (error) {
        console.error('Error creating tasks:', error);
        return {
            errors: {
                _form: ['Failed to create tasks'],
            },
        };
    }

    revalidatePath('/')
    redirect('/')

}

interface TasksEditFormState {
    errors: {
        content?: string[],
        phase?: string[],
        _form?: string[],
    }
}

export default async function createTaskSimplified(formData: FormData): Promise<TasksEditFormState> {

    const tasksString = formData.get('newTasks') as string;
    const newTasks = JSON.parse(tasksString);

    const result: UpdateTaskFormState = {
        errors: {}
    };

    try {

        // Use Prisma's createMany to insert the valid tasks
        await db.task.createMany({
            data: newTasks,
        })

    } catch (error) {
        console.error('Error creating tasks:', error);
        return {
            errors: {
                _form: ['Failed to create tasks'],
            },
        };
    }
    return result
}

interface TaskForUpdate {
    content?: string;
    id?: string;
    phase?: string;
}

export async function updateTaskPhase(task: TaskForUpdate) {
    try {
        if (task.phase === 'in progress') {
            await db.task.update({
                where: {
                    id: task.id,
                },
                data: {
                    phase: 'complete'
                }
            })
        }
        if (task.phase === 'complete') {
            await db.task.update({
                where: {
                    id: task.id,
                },
                data: {
                    phase: 'in progress'
                }
            })
        }
    } catch (error) {
        return console.error('Error updating task phase:', error);
    }

    revalidatePath('/')
}

const updateTaskSchema = z.object({
    // the title must be a string between 3 and 255 characters
    // the content must be a string between 10 and 4000 characters
    content: z.string().min(3).max(400),
    id: z.string().cuid()
})

// Define an interface for the form state
interface UpdateTaskFormState {
    errors: {
        content?: string[],
        id?: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a post
export async function updateTasksContent(formData: FormData): Promise<UpdateTaskFormState> {
    const tasksString = formData.get('tasks') as string;
    const tasksArray = JSON.parse(tasksString);

    const result: UpdateTaskFormState = {
        errors: {}
    };

    for (const task of tasksArray) {
        const parsedTask = updateTaskSchema.safeParse(task);

        if (!parsedTask.success) {
            // Collect errors for the current task
            for (const issue of parsedTask.error.issues) {
                if (!result) {
                    console.log('error')
                }
            }
        } else {
            // Perform the update operation using Prisma
            try {
                await db.task.update({
                    where: { id: parsedTask.data.id },
                    data: { content: parsedTask.data.content }
                });
            } catch (error) {
                // Handle Prisma update errors
                result.errors._form = result.errors._form || [];
                result.errors._form.push(`Failed to update task with ID ${parsedTask.data.id}: ${error}`);
            }
        }
    }

    return result;
}

interface TaskFormStateDelete {
    errors: string[] | null;
    success?: boolean;
}

export async function deleteTask(formData: FormData): Promise<TaskFormStateDelete> {
    const tasksString = formData.get('deletedTasks') as string;
    const tasksArray = JSON.parse(tasksString);


    try {
        // First, delete the associated tasks
        await db.task.deleteMany({
            where: {
                id: {
                    in: tasksArray
                }
            },
        });


    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: [error.message]
            };
        } else {
            return {
                errors: ['Something Went Wrong']
            };
        }
    } return {
        success: true,
        errors: ['none']
    }
}