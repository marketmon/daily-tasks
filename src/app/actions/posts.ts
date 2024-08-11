'use server'

// Import the database client and the Post type from Prisma
import { db } from '@/db'
import type { Post } from '@prisma/client'

// Import the revalidatePath and redirect functions from Next.js
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UTApi } from 'uploadthing/server'

// Import the Zod library for validation
import { z } from 'zod'

// Define a schema for the post using Zod
const postSchema = z.object({
    // the title must be a string between 3 and 255 characters
    authorId: z.string().cuid(),
    // the content must be a string between 10 and 4000 characters
    content: z.string().min(1).max(4000),
    photo: z.string(),
})

// Define an interface for the form state
interface PostFormState {
    errors: {
        content?: string[],
        authorId?: string[],
        photo?: string[],
        _form?: string[],
    }
}

// Define an asynchronous function to create a post
export async function createPost(
    formState: PostFormState,
    formData: FormData,
): Promise<PostFormState> {
    // Validate the form data against the post schema
    // If the form data does not match the schema, the safeParse method returns an object 
    // with a success property of false and an error property containing the validation errors. 
    // If the form data matches the schema, the safeParse method returns an object 
    // with a success property of true and a data property containing the validated data. 


    const result = postSchema.safeParse({
        content: formData.get('content'),
        authorId: formData.get('authorId'),
        photo: formData.get('photo')
    })

    // If validation fails, return the errors
    if (!result.success) {
        return {
            // The flatten method is used to convert the validation errors into a flat object structure 
            // that can be easily displayed in the form.
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        // If validation passes, create a new post in the database
        post = await db.post.create({
            data: {
                content: result.data.content,
                authorId: result.data.authorId,
                photo: result.data.photo
            }
        })
    } catch (error: unknown) {
        // If there's an error, return it
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Revalidate the path and redirect to the home page
    redirect(`/manage/post/create/${post.id}/tasks`)

    return {
        errors: {
            _form: [],
        },
    }
}

const updatePostSchema = z.object({
    // the content must be a string between 10 and 4000 characters
    content: z.string().min(3).max(4000),
    id: z.string().cuid(),
})

interface UpdatePostFormState {
    errors: {
        content?: string[],
        _form?: string[],
    }
}

export async function updatePost(
    formData: FormData
): Promise<UpdatePostFormState> {
    const result = updatePostSchema.safeParse({
        content: formData.get('postContent'),
        id: formData.get('postId')
    })

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        post = await db.post.update({
            where: {
                id: result.data.id
            },
            data: {
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        }
        else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }
    return {
        errors: {
            content: ['none'],
            _form: ['none']
        }
    };
}

interface PostFormStateDelete {
    errors: string[] | null;
    success?: boolean;
}

export async function deletePostAndPhoto(id: string, photo: string): Promise<PostFormStateDelete> {
    try {
        // First, delete the associated tasks
        await db.task.deleteMany({
            where: { postId: id },
        });

        // Then, delete the post
        await db.post.delete({
            where: { id },
        });

        // Delete the associated photo from external service
        const baseUrl = "https://utfs.io/f/";
        const justUploadThingId = photo.replace(baseUrl, '');

        const utapi = new UTApi();
        await utapi.deleteFiles(justUploadThingId);



    } catch (error: unknown) {
        if (error instanceof Error) {
            return {
                errors: [error.message]
            };
        } else {
            return {
                errors: ['Something went wrong']
            };
        }
    }

    revalidatePath('/');

    redirect('/');
}

export async function deletePost(id: string): Promise<PostFormStateDelete> {
    try {
        // First, delete the associated tasks
        await db.task.deleteMany({
            where: { postId: id },
        });

        // Then, delete the post
        await db.post.delete({
            where: { id },
        });

        revalidatePath('/')
        redirect('/');

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
    }
}

export async function addPhoto(id: string, photoUrl: string): Promise<PostFormStateDelete> {
    try {
        // First, delete the associated tasks
        await db.post.update({
            where: {
                id: id
            },
            data: {
                photo: photoUrl,
            }
        });


        revalidatePath('/');
        redirect('/');

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
    }
}