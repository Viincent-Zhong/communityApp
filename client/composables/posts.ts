import { useRuntimeConfig, useRouter } from '#app';
import { useToast } from 'primevue/usetoast';

export const useChat = () => {
    const toast = useToast()
    const runtimeConfig = useRuntimeConfig();

    return { };
};