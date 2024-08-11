

interface PostTask {
    content?: string;
    id?: string;
    phase?: string;
}

export interface PostWithTaskAndAuthor {
    post: {
        id?: string;
        content?: string;
        createdAt?: Date;
        updatedAt?: Date;
        authorId?: string;
        author?: {
            name?: string;
            id?: string;
        };
        task?: PostTask[]
    }
}

export interface PostWithAuthor {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string | null;
    author?: {
        name: string;
        id: string;
    } | null;
}


export interface AuthorWithPosts {
    name: string;
    id: string;
    photo: string;
    createdAt: Date,
    post?: {
        photo: string;
        id: string;
        content: string;
        createdAt: Date;
        task: {
            id: string;
            content: string;
            phase: string;
            createdAt: Date;
            updatedAt: Date;
            postId: string | null;
        }[];
    }[] | null;
}


export type Author = {
    id: string;
    name: string;
    photo: string;
    createdAt: Date;
};

export type Post = {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    authorId: string;
};

export type Task = {
    id: string;
    content: string;
    phase: string;
    createdAt: Date;
    updatedAt: Date;
    completedAt: Date;
    postId: string;
    authorId: string;
};