<template>
    <h1 class="mt-36 text-black">Chat room with id: {{ id }}</h1>
    <div class="text-black">
      <h1>{{ chatRoom.title }}</h1>
      <p>{{ chatRoom.content }}</p>
    </div>
  </template>
  
<script setup lang="ts">
  const route = useRoute()
  const id = route.params.id

const { chatRoom, getChatRoom } = useChatRoom();

onMounted(async () => {
  await getChatRoom(id);
  // console.log(chatsRooms)
});
</script>