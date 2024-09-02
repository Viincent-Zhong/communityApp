import { useToast } from 'primevue/usetoast';
import { useRuntimeConfig, useRouter } from '#app';

export const useAuth = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();
    const router = useRouter();

    const login = async (email: string, password: string) => {
        try {
            await $fetch( `${runtimeConfig.public.apiUrl}/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            } );
            toast.add({ severity: 'success', summary: 'Success', detail: 'Logged in successfully', life: 3000 });
            router.push('/home');
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or password', life: 3000 });
        }
    };

    const register = async (email: string, name: string, password: string) => {
        try {
        await $fetch(`${runtimeConfig.public.apiUrl}/auth/register`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, name, password })
        } );
        toast.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully', life: 3000 });
        router.push('/home');
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid inputs', life: 3000});
        }
    };

    const logout = async () => {
        await $fetch( `${runtimeConfig.public.apiUrl}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        router.push('/auth/login');
    };

    return { login, register, logout };
};