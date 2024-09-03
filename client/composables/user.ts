import { useRuntimeConfig, useRouter } from '#app';
import { useToast } from 'primevue/usetoast';

export const useUser = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();
    // const router = useRouter();
    const user = useState("user", () => {
        return {
            name: "Vince le Z",
            email: "vince@gmail.com",
            description: "Hi I'm Vince a random user",
            likes: 0,
        };
    });

    const getUser = async (name: string, email: string) => {
        try {
            await $fetch(`${runtimeConfig.public.apiUrl}/user`, {
                method: 'GET',
                include: 'credentials'
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'User refreshed', life: 3000 });
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid inputs', life: 3000});
        }
    };

    return { user, getUser };
};