<template>
    <div class="bg-gray-300 h-screen flex min-h-80">
        <!-- Background image -->
        <img src="/images/auth-bg.jpg" alt="bg" class="absolute w-full h-full z-10"/>
        <!-- Form -->
        <div class="w-1/2 ml-auto my-auto z-10">
            <div class="w-full lg:w-1/2 bg-slate-50 border border-slate-400 flex flex-col space-y-4 p-10 mx-auto rounded-xl z-10">
                <h1 class="text-slate-500 text-center text-3xl font-semibold"> {{login ? "Login" : "Register"}}</h1>
                <div>
                    <label class="text-slate-500 font-medium">Email</label>
                    <InputText class="w-full bg-gray-800"/>
                </div>
                <div v-if="!login">
                    <label class="text-slate-500 font-medium">Name</label>
                    <InputText class="w-full bg-gray-800"/>
                </div>
                <div>
                    <label class="text-slate-500 font-medium">Password</label>
                    <Password v-model="input.password" class="w-full bg-gray-800 rounded-xl" input-class="w-full"/>
                </div>
                <div v-if="!login">
                    <label class="text-slate-500 font-medium">Confirm password</label>
                    <Password v-model="input.confirmPassword" class="w-full bg-gray-800 rounded-xl" input-class="w-full"/>
                </div>
                <Button class="w-full bg-slate-500 text-slate-50 mt-6" @click="onSubmit"> {{login ? "Login" : "Register"}} </Button>
                <a href="" @click.prevent="toggleLogin" class="text-blue-500 hover:underline">
                    {{ login ? "Already have an account?" : "Don't have an account?" }}
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
const toast = useToast()

const login = ref(true);
const input = ref({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
});

const onSubmit = () => {
    if (login.value) {
        console.log("Login");
        toast.add({severity:'success', summary: 'Success', detail: 'Login successful', life: 3000});
    } else {
        console.log(input.value);
    }

}

const toggleLogin = () => {
    login.value = !login.value;
}

</script>