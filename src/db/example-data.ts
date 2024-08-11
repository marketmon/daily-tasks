const authors = [
    {
        id: 'author1',
        name: 'Ethan',
        photo: 'https://example.com/photos/alice.jpg',
        createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    {
        id: 'author2',
        name: 'Melissa',
        photo: 'https://example.com/photos/bob.jpg',
        createdAt: new Date('2023-01-01T00:00:00Z'),
    },
    {
        id: 'author3',
        name: 'Turner',
        photo: 'https://example.com/photos/bob.jpg',
        createdAt: new Date('2023-01-01T00:00:00Z'),
    },
];

const posts = [
    {
        id: 'post1',
        content: 'This is the content of my first post.',
        createdAt: new Date('2023-01-02T00:00:00Z'),
        updatedAt: new Date('2023-01-02T01:00:00Z'),
        authorId: 'author1',
    },
    {
        id: 'post2',
        content: 'Here is some more interesting content.',
        createdAt: new Date('2023-01-02T00:00:00Z'),
        updatedAt: new Date('2023-01-02T01:00:00Z'),
        authorId: 'author2',
    },
    {
        id: 'post3',
        content: 'Haha got me there',
        createdAt: new Date('2023-01-02T00:00:00Z'),
        updatedAt: new Date('2023-01-02T01:00:00Z'),
        authorId: 'author3',
    },
    {
        id: 'post4',
        content: 'Ok I get it now',
        createdAt: new Date('2022-12-02T00:00:00Z'),
        updatedAt: new Date('2022-12-04T01:00:00Z'),
        authorId: 'author1',
    },
];

const tasks = [
    {
        id: 'task1',
        content: 'Complete the project proposal.',
        phase: 'In Progress',
        createdAt: new Date('2023-01-03T00:00:00Z'),
        updatedAt: new Date('2023-01-03T01:00:00Z'),
        completedAt: new Date('2023-01-03T01:00:00Z'),
        postId: 'post1',
        authorId: 'author1',
    },
    {
        id: 'task2',
        content: 'Review the codebase.',
        phase: 'In Progress',
        createdAt: new Date('2023-01-05T00:00:00Z'),
        updatedAt: new Date('2023-01-05T01:00:00Z'),
        completedAt: new Date('2023-01-05T01:00:00Z'),
        postId: 'post2',
        authorId: 'author2',
    },
    {
        id: 'task3',
        content: 'Look for Alaska',
        phase: 'Complete',
        createdAt: new Date('2023-01-05T00:00:00Z'),
        updatedAt: new Date('2023-01-05T01:00:00Z'),
        completedAt: new Date('2023-01-05T01:00:00Z'),
        postId: 'post2',
        authorId: 'author2',
    },
];

export { authors, posts, tasks };