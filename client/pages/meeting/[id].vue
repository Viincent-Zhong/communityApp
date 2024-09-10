<template>
  <div class="w-full mt-24">
    <div class="ml-24 w-[70%] bg-slate-200 p-4">
      <div class="flex flex-row items-center">
          <!-- Add redirection on pp to user profile -->
          <img src="/images/default-pp.jpeg" alt="pp" class="h-16 w-16 rounded-full cursor-pointer"/>
          <div class="ml-6">
              <h1 class="text-3xl text-zinc-800">{{meetingRoom.author}}</h1>
              <p class="text-lg font-thin text-zinc-800">{{meetingRoom.createdAt}}</p>
          </div>
      </div>
      <!-- Room infos -->
      <div class="w-full mt-10">
          <h1 class="w-full text-2xl underline font-mono text-zinc-800">Scheduled for {{ meetingRoom.date }}</h1>
          <h1 class="w-full text-center text-5xl font-mono text-zinc-800">{{ meetingRoom.title }}</h1>
          <p class="mt-10 text-2xl text-zinc-800">{{ meetingRoom.content }}</p>
      </div>

      <!-- Border -->
      <div class="w-full flex flex-row justify-center">
        <div class="border border-lg border-slate-300 w-[90%] my-8"></div>
      </div>
      
      <!-- Add comment -->
      <div class="w-full flex flex-col ml-6">
        <Textarea v-model="comment" class="w-[90%] rounded h-28 p-4 text-xl text-slate-100 font-mono" placeholder="Add a comment..."/>
        <div class="w-24 lg:w-32 mt-2 p-2 lg:p-4 bg-amber-500 rounded-md cursor-pointer" @click="() => {handleCreateComment()}">
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
            <img src="/images/default-pp.jpeg" alt="pp" class="h-14 w-14 rounded-full cursor-pointer"/>
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

import Textarea from 'primevue/textarea';
import { ref } from 'vue';
import { CommentType } from '~/composables/comments';

const route = useRoute()
const id = route.params.id as string

const comment = ref('')

const { meetingRoom, getMeetingRoom } = useMeetingRoom();
const { comments, createComment, getComments } = useComment();

const handleCreateComment = async () => {
  await createComment(comment.value, meetingRoom.value.id, CommentType.Meeting);
  comment.value = '';
  window.location.reload();
}

onMounted(async () => {
  await getMeetingRoom(id);
  await getComments(meetingRoom.value.id, CommentType.Meeting);
});
</script>