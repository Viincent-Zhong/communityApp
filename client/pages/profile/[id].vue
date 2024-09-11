<template>
    <div class="mt-36 ml-72">
        <div class="flex bg-white w-2/3 p-10 min-h-48 ">
            <!-- Picture -->
            <div class="flex items-center">
                <img src="/images/default-pp.jpeg" alt="pp" class="h-24 w-28 rounded-full"/>
            </div>
            <div class="flex flex-row justify-start pl-6 w-full">
                <!-- Infos -->
                <div class="flex flex-col w-2/3">
                    <h2 class="text-slate-700 text-2xl font-semibold pb-1">{{ user.name }}</h2>
                    <p class="text-slate-700 font-light pb-2">{{ user.email }}</p>
                    <p class="text-slate-700 bg-slate-300 min-h-32 rounded p-2">{{ user.description }}</p>
                </div>
                <!-- Like -->
                <div class="ml-auto my-auto flex flex-col items-center">
                    <div class="flex flex-row">
                        <Avatar image="/images/heart.png" class=""/>
                        <p class="text-slate-700 ml-2 self-center">{{ user.likeCounter }} likes</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-10 w-[80%] bg-white p-6">
            <!-- Add comment -->
            <div class="w-full flex flex-row ml-6 h-24 items-center">
                <Textarea v-model="comment" class="w-[50%] rounded h-full p-4 text-xl text-slate-100 font-mono" placeholder="Add a comment..."/>
                <div class="w-24 lg:w-32 h-2/3 ml-6 p-2 lg:p-4 bg-amber-500 rounded-md cursor-pointer" @click="() => {handleCreateComment()}">
                    <h1 class="select-none font-mono text-lg text-center text-zinc-800 "> Post </h1>
                </div>
            </div>
            <!-- Border -->
            <div class="w-full flex flex-row justify-center">
              <div class="border border-lg border-slate-300 w-[90%] my-8"></div>
            </div>
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
import Avatar from 'primevue/avatar';
import { CommentType } from '#imports';
import { useRouter } from '#app';

const router = useRouter();

const { user, getUser } = useUser();
const { comments, createComment, getComments } = useComment();
const route = useRoute()
const id = route.params.id as string
const comment = ref('')

const handleCreateComment = async () => {
  await createComment(comment.value, parseInt(id), CommentType.Profile);
  comment.value = '';
  window.location.reload();
}

onMounted(async () => {
    await getUser(id);
    await getComments(parseInt(id), CommentType.Profile);
});

</script>