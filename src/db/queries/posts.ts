import type { Post, Author } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '@/db'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.
import { PostWithAuthor, PostWithTaskAndAuthor } from '@/lib/definitions'

export async function fetchPosts(authorId: string): Promise<Post[]> {  // Function to fetch all posts from the database.
    const posts = await db.post.findMany({
        where: { authorId },
        orderBy: { createdAt: 'desc' },
    });

    return posts

}

export async function fetchPost(id: string) {
    const post = await db.post.findFirst({
        where: { id },
        include: {
            author: {
                select: { name: true, id: true }
            },
            task: {
                select: { content: true, id: true, phase: true }
            }
        }
    })

    return post
}
