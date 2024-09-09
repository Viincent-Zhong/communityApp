<template>
    <div class="bg-gray-300 h-screen flex min-h-80">
        <!-- Background image -->
        <img src="/images/auth-bg.jpg" alt="bg" class="absolute w-full h-full"/>
        <!-- Form -->
        <div class="w-1/2 ml-auto my-auto z-10">
            <div class="w-full lg:w-1/2 bg-slate-50 border border-slate-400 flex flex-col space-y-4 p-10 mx-auto rounded-xl">
                <h1 class="text-slate-500 text-center text-3xl font-semibold"> {{toggleLogin ? "Login" : "Register"}}</h1>
                <div>
                    <label class="text-slate-500 font-medium">Email</label>
                    <InputText v-model="input.email" class="w-full bg-gray-800"/>
                </div>
                <div v-if="!toggleLogin">
                    <label class="text-slate-500 font-medium">Name</label>
                    <InputText v-model="input.name" class="w-full bg-gray-800"/>
                </div>
                <div>
                    <label class="text-slate-500 font-medium">Password</label>
                    <Password v-model="input.password" class="w-full bg-gray-800 rounded-xl" input-class="w-full" toggleMask/>
                </div>
                <div v-if="!toggleLogin">
                    <label class="text-slate-500 font-medium" toggleMask>Confirm password</label>
                    <Password v-model="input.confirmPassword" class="w-full bg-gray-800 rounded-xl" input-class="w-full"/>
                </div>
                <Button class="w-full bg-slate-500 text-slate-50 mt-6" @click="onSubmit"> {{toggleLogin ? "Login" : "Register"}} </Button>
                <a href="" @click.prevent="switchToggleLogin" class="text-blue-500 hover:underline">
                    {{ toggleLogin ? "Don't have an account?" : "Already have an account?" }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Password from "primevue/password";
import { useToast } from 'primevue/usetoast';

definePageMeta({
  title: "Auth",
  description: "Auth",
  layout: false,
});

const { login, register } = useAuth();
const toast = useToast()

const toggleLogin = ref(true);
const input = ref({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const onSubmit = () => {
    if (toggleLogin.value) { // Login
        login(input.value.email, input.value.password);
    } else { // Register
        if (!input.value.confirmPassword || (input.value.password !== input.value.confirmPassword))
            return toast.add({severity:'error', summary: 'Error', detail: 'Passwords do not match', life: 3000});
        register(input.value.email, input.value.name, input.value.password);
    }
}

const switchToggleLogin = () => {
    toggleLogin.value = !toggleLogin.value;
}

</script>