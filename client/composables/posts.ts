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

    const chatsRooms = useState<ChatRoom[]>("chats", () => {
        return [];
    });

    const createChatRoom = async (roomName: string, content: string) => {
        try {
            await $fetch( `${runtimeConfig.public.apiUrl}/posts/chat`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: roomName, content }),
                credentials: 'include'
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'Chat room created', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create room', life: 3000 });
        }
        return;
    };

    const getChatsRooms = async () => {
        try {
            const res : ChatRoom[] = await $fetch(`${runtimeConfig.public.apiUrl}/posts/chat`, {
                method: 'GET',
                credentials: 'include'
            });
            chatsRooms.value = res;
            chatsRooms.value.forEach(async (chat) => {
                chat.createdAt = formatDate(chat.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user?id=${chat.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                chat.author = user.name;
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Chat rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
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

    const meetingRooms = useState<MeetingRoom[]>("meetings", () => {
        return [];
    });

    const createMeetingRoom = async (roomName: string, content: string, date: string) => {
        try {
            await $fetch( `${runtimeConfig.public.apiUrl}/posts/meeting`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: roomName, content, date }),
                credentials: 'include'
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'Meeting room created', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create room', life: 3000 });
        }
        return;
    };

    const getMeetingRooms = async () => {
        try {
            const res : MeetingRoom[] = await $fetch(`${runtimeConfig.public.apiUrl}/posts/meeting`, {
                method: 'GET',
                credentials: 'include'
            });
            meetingRooms.value = res;
            meetingRooms.value.forEach(async (chat) => {
                chat.createdAt = formatDate(chat.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user?id=${chat.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                chat.author = user.name;
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Chat rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
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

    const sellRooms = useState<SellRoom[]>("sells", () => {
        return [];
    });

    const createSellRoom = async (roomName: string, content: string, date: string, item: string, price: number, quantity: number) => {
        try {
            await $fetch( `${runtimeConfig.public.apiUrl}/posts/sells`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title: roomName, content, date, item, price, quantity }),
                credentials: 'include'
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'Sell room created', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to create room', life: 3000 });
        }
        return;
    };

    const getSellRooms = async () => {
        try {
            const res : SellRoom[] = await $fetch(`${runtimeConfig.public.apiUrl}/posts/sells`, {
                method: 'GET',
                credentials: 'include'
            });
            sellRooms.value = res;
            sellRooms.value.forEach(async (chat) => {
                chat.createdAt = formatDate(chat.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user?id=${chat.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                chat.author = user.name;
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Chat rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return sellRooms;
    };

    return { sellRooms, createSellRoom, getSellRooms };
};