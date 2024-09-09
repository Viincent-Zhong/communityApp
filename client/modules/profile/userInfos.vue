<template>
    <div class="flex  bg-white w-2/3 p-10 min-h-48 ">
        <!-- Picture -->
        <div class="flex items-center">
        <img src="/images/default-pp.jpeg" alt="pp" class="h-24 w-28 rounded-full"/>
        </div>
        <div class="flex flex-row justify-start pl-6 w-full">
            <!-- Infos -->
            <div v-if="!toggleUpdate" class="flex flex-col w-2/3">
                <h2 class="text-slate-700 text-2xl font-semibold pb-1">{{ userInfos.name }}</h2>
                <p class="text-slate-700 font-light pb-2">{{ userInfos.email }}</p>
                <p class="text-slate-700 bg-slate-300 min-h-32 rounded p-2">{{ userInfos.description }}</p>
            </div>
            <!-- Update infos -->
            <div v-if="toggleUpdate" class="flex flex-col w-2/3">
                <InputText v-model="userInfos.name" class="text-slate-700 text-2xl font-semibold pb-1 w-1/3"/>
                <p class="text-slate-700 font-light pb-2">{{ userInfos.email }}</p>
                <InputText v-model="userInfos.description" class="w-full text-slate-700 bg-slate-300 min-h-32 rounded p-2 text-left "/>
            </div>
            <!-- Like + Update / Save-->
            <div class="ml-auto my-auto flex flex-col items-center">
                <div class="flex flex-row">
                    <Avatar image="/images/heart.png" class=""/>
                    <p class="text-slate-700 ml-2 self-center">{{ userInfos.likes }} likes</p>
                </div>
                <div class="my-auto pt-16">
                <Button class="w-full bg-slate-500 text-slate-50 mt-6" @click="switchToggleUpdate"> {{toggleUpdate ? "Save" : "Update"}} </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import { useToast } from 'primevue/usetoast';

const props = defineProps<{
  user: any;
}>();

const toggleUpdate = ref(false);
const toast = useToast()

const switchToggleUpdate = () => {
    if (toggleUpdate.value) {
        updateInfos(userInfos.value.name, userInfos.value.description);
    }
    toggleUpdate.value = !toggleUpdate.value;
}

const { user } = useUser();

const userInfos = ref({
    name: '',
    email: '',
    picture: 'default.jpg',
    description: '',
    likes: 0
});

onMounted(() => {
    console.log('Infos : ', props.user);
    userInfos.value.name = props.user.name;
    userInfos.value.email = props.user.email;
    userInfos.value.description = props.user.description;
    userInfos.value.likes = props.user.likes;
});

const updateInfos= (name: string, description: string) => {
    toast.add({severity:'success', summary: 'Success', detail: 'Infos updated', life: 3000});
}

</script>
