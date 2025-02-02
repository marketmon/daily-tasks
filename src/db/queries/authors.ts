import type { Author } from '@prisma/client' // Importing the Post type from the Prisma client library.
import { db } from '@/db'
import { AuthorWithPosts } from '@/lib/definitions'
import { notFound } from 'next/navigation' // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchAuthors(): Promise<Author[]> {  // Function to fetch all authors from the database.
    return await db.author.findMany({})
}



export async function fetchAuthorByName(name: string): Promise<AuthorWithPosts | null> { // Function to fetch a single post by its ID.
    const author = await db.author.findFirst({
        where: {
            name
        },
        include: {
            post: {
                select: { content: true, id: true, createdAt: true, task: true, photo: true },
                orderBy: { createdAt: 'desc' },
            }
        }
    })

    if (!author) {
        notFound() // If the post is not found, a 404 error is thrown.
    }

    return author
}

type AuthorWithPaginatedPosts = {
    id: string;
    name: string;
    post: {
        content: string;
        id: string;
        createdAt: Date;
        task: {
            id: string;
            content: string;
            phase: string;
            createdAt: Date;
            updatedAt: Date;
            postId: string | null;
        }[];
        photo: string;
    }[];
    _count: {
        post: number;
    };
}

export async function fetchAuthorPosts(
    name: string,
    page: number = 1,
    pageSize: number = 12
): Promise<AuthorWithPaginatedPosts | null> {
    const skip = (page - 1) * pageSize;

    const author = await db.author.findFirst({
        where: {
            name
        },
        include: {
            post: {
                select: {
                    content: true,
                    id: true,
                    createdAt: true,
                    task: true,
                    photo: true
                },
                orderBy: { createdAt: 'desc' },
                skip,
                take: pageSize
            },
            _count: {
                select: {
                    post: true
                }
            }
        }
    });

    if (!author) {
        notFound();
    }

    return author;
}
