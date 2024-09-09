import { useRuntimeConfig, useRouter } from '#app';
import { useToast } from 'primevue/usetoast';
import { formatDate } from './formatDate';

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

export const useMeetingRoom = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type MeetingRoom = {
        id: number;
        authorId: number;
        author: string;
        name: string;
        content: string;
        createdAt: string;
        date: string;
    }

    const defaultMeetingRooms = [
        {id: 12, authorId: 1234, author: 'Meeting', name: 'room1', content: 'content1', createdAt: '2021-09-01', date: '09/24/2024 05:21 pm'},
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01', date: '09/24/2024 05:21 pm'},
        {id: 12, authorId: 1234, author: 'Vince', name: 'room1', content: 'content1', createdAt: '2021-09-01', date: '09/24/2024 05:21 pm'},
    ];

    const meetingRooms = useState<MeetingRoom[]>("meetings", () => {
        return defaultMeetingRooms;
    });

    const createMeetingRoom = async (roomName: string, content: string, date: string) => {
        const formattedDate = formatDate(date);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Chat room created', life: 3000 });
        console.log('createChat ', roomName, content, formattedDate);
        return;
    };

    const getMeetingRooms = async () => {
        return meetingRooms;
    };

    return { meetingRooms, createMeetingRoom, getMeetingRooms };
};

export const useSellRoom = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type SellRoom = {
        id: number;
        authorId: number;
        author: string;
        name: string;
        content: string;
        createdAt: string;
        date: string;
        item: string;
        price: number;
        quantity: number;
    }

    const defaultSellRooms = [
        {id: 12, authorId: 1234, author: 'Vente', name: 'room1', content: 'content1', createdAt: '2021-09-01', date: '09/24/2024 05:21 pm', item: 'item1', price: 100, quantity: 10},
        {id: 12, authorId: 1234, author: 'Vente2', name: 'room1', content: 'content1', createdAt: '2021-09-01', date: '09/24/2024 05:21 pm', item: 'item1', price: 100, quantity: 10},
    ];

    const sellRooms = useState<SellRoom[]>("sells", () => {
        return defaultSellRooms;
    });

    const createSellRoom = async (roomName: string, content: string, date: string, item: string, price: number, quantity: number) => {
        toast.add({ severity: 'success', summary: 'Success', detail: 'Sell room created', life: 3000 });
        console.log('createChat ', roomName, content);
        return;
    };

    const getSellRooms = async () => {
        return sellRooms;
    };

    return { sellRooms, createSellRoom, getSellRooms };
};