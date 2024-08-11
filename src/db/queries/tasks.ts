import { db } from '@/db'
import type { Task } from '@prisma/client' // Importing the Post type from the Prisma client library.


export async function getTasksByPostAndAuthor(postId: string, postIdsArray: string[]) {
    const tasksData = await db.task.findMany({
        where: {
            OR: [
                { postId: postId },
                {
                    AND: [
                        { phase: 'in progress' },
                        { postId: { in: postIdsArray } }
                    ]
                }
            ]
        },
    });

    return tasksData;
}

export async function getAllTasks(postIdsArray: string[]) {
    const tasksData = await db.task.findMany({
        where: {
            postId: { in: postIdsArray }
        },
    });

    return tasksData;
}