export type Note = {
    id: number;
    title: string;
    description: string;
    tag: string;
    createdAt: string;
}

export type AuthMode = 'signin' | 'signup';