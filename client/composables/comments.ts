import { useRuntimeConfig } from '#app';
import { useToast } from 'primevue/usetoast';
import { formatDate } from './formatDate';

export enum CommentType {
    Profile = 1,
    Chat = 2,
    Sells = 3,
    Meeting = 4
};

export const useComment = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type Comment = {
        id: number;
        authorId: number;
        author: string;
        content: string;
        createdAt: string;
    }
    
    const comments = useState<Comment[]>("comments", () => {
        return [];
    });

    const createComment = async (content: string, id: number, type: number) => {
        try {
            await $fetch( `${runtimeConfig.public.apiUrl}/comments`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ content, id, type }),
                credentials: 'include'
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'Comment added', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not add comment', life: 3000 });
        }
    }

    const getComments = async (id: number, type: number) => {
        try {
            const res: Comment[] = await $fetch( `${runtimeConfig.public.apiUrl}/comments?id=${id}&type=${type}`, {
                credentials: 'include'
            } );
            comments.value = res;
            comments.value.forEach(async (comment) => {
                comment.createdAt = formatDate(comment.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user?id=${comment.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                comment.author = user.name;
            });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Could not get comments', life: 3000 });
        }
    }

    return { comments, createComment, getComments }
}
