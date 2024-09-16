import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getTasksThisWeek() {
    // Get the start and end of the current week
    /*
    const now = new Date()
    const startOfWeekDate = new Date('2024-08-12T00:00:00.000Z')
    const endOfWeekDate = new Date('2024-08-18T23:59:59.999Z')

    const tasksThisWeek = await prisma.task.findMany({
        where: {
            createdAt: {
                gte: startOfWeekDate, // Greater than or equal to the start of the week
                lte: endOfWeekDate,   // Less than or equal to the end of the week
            },
        },
        select: {
            content: true,
            createdAt: true,
            phase: true,
            post: {
                select: {
                    content: true,       // Include post content
                    author: {
                        select: {
                            name: true,       // Include only the author's name
                        },
                    },
                },
            },
        },
    })

    // Map the results to include only the author's name as `authorName`
    const transformedData = tasksThisWeek.map(task => ({
        taskContent: task.content,
        taskCreatedAt: task.createdAt,
        taskPhase: task.phase,
        authorName: task.post?.author?.name ?? null, // Include authorName
        postContent: task.post?.content ?? null,     // Include postContent
    }))

    return transformedData
    */

    try {
        // Fetching data using Prisma
        const authorsWithPostsAndTasks = await prisma.author.findMany({
            include: {
                post: {
                    where: {
                        createdAt: {
                            gte: new Date('2024-09-01'),
                            lte: new Date('2024-09-7'),
                        },
                    },
                    include: {
                        task: true, // Include all tasks related to the post
                    },
                },
            },
        });

        return console.log(JSON.stringify(authorsWithPostsAndTasks));
    } catch (error) {
        console.error('Error fetching data:', error);
    }

}



