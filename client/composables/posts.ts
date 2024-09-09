import { useRuntimeConfig, useRouter } from '#app';
import { useToast } from 'primevue/usetoast';

export const useChatRoom = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type ChatRoom = {
        id: number;
        authorId: number;
        author: string;
        name: string;
        content: string;
        createdAt: string;
    }

    const defaultChatsRooms = [
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01'},
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01'},
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01'},
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01'},

    ];

    const chatsRooms = useState<ChatRoom[]>("chats", () => {
        return defaultChatsRooms;
    });

    const createChatRoom = async (roomName: string, content: string) => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Chat room created', life: 3000 });
        console.log('createChat ', roomName, content);
        return;
    };

    const getChatsRooms = async () => {
        return chatsRooms;
    };

    return { chatsRooms, createChatRoom, getChatsRooms };
};