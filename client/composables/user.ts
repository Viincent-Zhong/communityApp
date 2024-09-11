import { useRuntimeConfig, useRouter} from '#app';
import { useToast } from 'primevue/usetoast';

export const useUser = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();

    type User = {
        name: string;
        email: string;
        description: string;
        likeCounter: number;
    }
    
    const defaultUser : User = {
        name: "",
        email: "",
        description: "",
        likeCounter: 0,
    }

    const user = useState("user", () => {
        return defaultUser;
    });

    const loadUser = async () => {
        try {
            const res : User = await $fetch(`${runtimeConfig.public.apiUrl}/user/`, {
                method: 'GET',
                credentials: 'include'
            });
            // Logged in
            user.value = res;
            return user;
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid inputs', life: 3000});
            // Not logged in
            user.value = defaultUser;
            router.push('/auth');
            return user;
        }
    }

    const getUser = async (id: number) => {
        try {
            const res : User = await $fetch(`${runtimeConfig.public.apiUrl}/user/unique?id=${id}`, {
                method: 'GET',
                credentials: 'include'
            });
            // Logged in
            console.log('Get user : ', res);
            user.value = res;
            return user;
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid inputs', life: 3000});
            user.value = defaultUser;
            return user;
        }
    }

    const updateUser = async (name: string, description: string) => {
        try {
            await $fetch(`${runtimeConfig.public.apiUrl}/user/`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    description
                })
            });
            toast.add({ severity: 'info', summary: 'Info', detail: 'Updating user...', life: 3000});
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid inputs', life: 3000});
        }
    }

    return { user, loadUser, getUser, updateUser };
}
