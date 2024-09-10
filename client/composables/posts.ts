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
        title: string;
        content: string;
        createdAt: string;
    }

    type ChatRoomDetails = {
        id: number;
        authorId: number;
        author: string;
        title: string;
        content: string;
        createdAt: string;
    }

    const defaultChatRoomDetails = {
        id: 0,
        authorId: 0,
        author: "",
        title: "",
        content: "",
        createdAt: "",
    }

    const chatsRooms = useState<ChatRoom[]>("chats", () => {
        return [];
    });

    const chatRoom = useState<ChatRoomDetails>("chat", () => {
        return defaultChatRoomDetails;
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
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${chat.authorId}`, {
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

    const getChatRoom = async (id: string) => {
        try {
            const res : ChatRoomDetails = await $fetch(`${runtimeConfig.public.apiUrl}/posts/chat-details?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            chatRoom.value = res;
            chatRoom.value.createdAt = formatDate(chatRoom.value.createdAt);
            const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${chatRoom.value.authorId}`, {
                method: 'GET',
                credentials: 'include',
            })
            chatRoom.value.author = user.name;

            toast.add({ severity: 'success', summary: 'Success', detail: 'Chat rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return chatRoom;
    };
    return { chatRoom, chatsRooms, createChatRoom, getChatsRooms, getChatRoom };
};

export const useMeetingRoom = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type MeetingRoom = {
        id: number;
        authorId: number;
        author: string;
        title: string;
        content: string;
        createdAt: string;
        date: string;
    }

    type MeetingRoomDetails = {
        id: number;
        authorId: number;
        author: string;
        title: string;
        content: string;
        createdAt: string;
        date: string;
    }

    const defaultMeetingRoomDetails = {
        id: 0,
        authorId: 0,
        author: "",
        title: "",
        content: "",
        createdAt: "",
        date: ""
    }

    const meetingRooms = useState<MeetingRoom[]>("meetings", () => {
        return [];
    });

    const meetingRoom = useState<MeetingRoomDetails>("meeting", () => {
        return defaultMeetingRoomDetails;
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
            meetingRooms.value.forEach(async (meeting) => {
                meeting.createdAt = formatDate(meeting.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${meeting.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                meeting.author = user.name;
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Meeting rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return meetingRooms;
    };

    const getMeetingRoom = async (id: string) => {
        try {
            const res : MeetingRoomDetails = await $fetch(`${runtimeConfig.public.apiUrl}/posts/meeting-details?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            meetingRoom.value = res;
            meetingRoom.value.createdAt = formatDate(meetingRoom.value.createdAt);
            const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${meetingRoom.value.authorId}`, {
                method: 'GET',
                credentials: 'include',
            })
            meetingRoom.value.author = user.name;

            toast.add({ severity: 'success', summary: 'Success', detail: 'Meeting rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return meetingRoom;
    };

    return { meetingRoom, meetingRooms, createMeetingRoom, getMeetingRooms, getMeetingRoom };
};

export const useSellRoom = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    type SellRoom = {
        id: number;
        authorId: number;
        author: string;
        title: string;
        content: string;
        createdAt: string;
        date: string;
        item: string;
        price: number;
        quantity: number;
    }

    type SellRoomDetails = {
        id: number;
        authorId: number;
        author: string;
        title: string;
        content: string;
        createdAt: string;
        date: string;
        item: string;
        price: number;
        quantity: number;
    };

    const defaultSellRoomDetails = {
        id: 0,
        authorId: 0,
        author: "",
        title: "",
        content: "",
        createdAt: "",
        date: "",
        item: "",
        price: 0,
        quantity: 0
    }

    const sellRooms = useState<SellRoom[]>("sells", () => {
        return [];
    });

    const sellRoom = useState<SellRoomDetails>("sell", () => {
        return defaultSellRoomDetails;
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
            sellRooms.value.forEach(async (sell) => {
                sell.createdAt = formatDate(sell.createdAt);
                const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${sell.authorId}`, {
                    method: 'GET',
                    credentials: 'include',
                })
                sell.author = user.name;
            });
            toast.add({ severity: 'success', summary: 'Success', detail: 'Sell rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return sellRooms;
    };

    const getSellRoom = async (id: string) => {
        try {
            const res : SellRoom = await $fetch(`${runtimeConfig.public.apiUrl}/posts/sell-details?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            sellRoom.value = res;
            sellRoom.value.createdAt = formatDate(sellRoom.value.createdAt);
            const user : any = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${sellRoom.value.authorId}`, {
                method: 'GET',
                credentials: 'include',
            })
            sellRoom.value.author = user.name;
            toast.add({ severity: 'success', summary: 'Success', detail: 'Sell rooms loaded', life: 3000 });
        } catch(error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Failed to load rooms', life: 3000 });
        }
        return sellRoom;
    };

    return { sellRoom, sellRooms, createSellRoom, getSellRooms, getSellRoom };
};