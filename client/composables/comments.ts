import { useRuntimeConfig } from '#app';
import { useToast } from 'primevue/usetoast';

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
        return [
            {id: 1, authorId: 1, author: "John Doe", content: "This is a comment", createdAt: "2021-09-01T12:00:00Z"},
        ];
    });

    const createComment = (content: string) => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Comment added', life: 3000 });
    }

    return { comments, createComment }
}
