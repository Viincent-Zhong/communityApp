<template>
    <div class="mt-36 ml-72">
        <div class="flex bg-white w-2/3 p-10 min-h-48 ">
            <!-- Picture -->
            <div class="flex items-center">
                <img src="/images/default-pp.jpeg" alt="pp" class="h-24 w-28 rounded-full"/>
            </div>
            <div class="flex flex-row justify-start pl-6 w-full">
                <!-- Infos -->
                <div v-if="!toggleUpdate" class="flex flex-col w-2/3">
                    <h2 class="text-slate-700 text-2xl font-semibold pb-1">{{ user.name }}</h2>
                    <p class="text-slate-700 font-light pb-2">{{ user.email }}</p>
                    <p class="text-slate-700 bg-slate-300 min-h-32 rounded p-2">{{ user.description }}</p>
                </div>
                <!-- Update infos -->
                <div v-if="toggleUpdate" class="flex flex-col w-2/3">
                    <InputText v-model="user.name" class="text-slate-700 text-2xl font-semibold pb-1 w-1/3"/>
                    <p class="text-slate-700 font-light pb-2">{{ user.email }}</p>
                    <InputText v-model="user.description" class="w-full text-slate-700 bg-slate-300 min-h-32 rounded p-2 text-left "/>
                </div>
                <!-- Like + Update / Save-->
                <div class="ml-auto my-auto flex flex-col items-center">
                    <div class="flex flex-row">
                        <Avatar image="/images/heart.png" class=""/>
                        <p class="text-slate-700 ml-2 self-center">{{ user.likeCounter }} likes</p>
                    </div>
                    <div class="my-auto pt-16">
                    <Button class="w-full bg-slate-500 text-slate-50 mt-6" @click="switchToggleUpdate"> {{toggleUpdate ? "Save" : "Update"}} </Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 w-[80%] bg-white p-6">
            <!-- Comments -->
            <div class="w-full flex flex-col ml-6">
                <div v-for="comment in comments" :key="comment.id" class="w-[90%] bg-slate-300 p-4 rounded-md my-4">
                    <div class="flex flex-row items-center">
                        <img src="/images/default-pp.jpeg" alt="pp" class="h-14 w-14 rounded-full cursor-pointer" @click="() => {router.push('/profile/' + comment.authorId)}"/>
                        <div class="ml-4 text-zinc-800">
                            <h1 class="text-2xl font-bold">{{ comment.author }}</h1>
                            <p class="text-lg font-thin">{{ comment.createdAt }}</p>
                        </div>
                    </div>
                    <p class="mt-4 text-lg text-black">{{ comment.content }}</p>
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
import { useRouter } from '#app';

const router = useRouter();
const toggleUpdate = ref(false);
const switchToggleUpdate = () => {
    if (toggleUpdate.value) {
        updateInfos(user.value.name, user.value.description);
    }
    toggleUpdate.value = !toggleUpdate.value;
}


const { user, loadUser, updateUser } = useUser();
const { comments, loadComments } = useComment();

const updateInfos = async (name: string, description: string) => {
    await updateUser(name, description);
    window.location.reload();
}

onMounted(async () => {
    await loadUser();
    await loadComments();
});

</script>