<template>
  <h1 class="mt-36 text-black">Meeting room with id: {{ id }}</h1>
  <div class="text-black">
    <h1>{{ meetingRoom.title }}</h1>
    <p>{{ meetingRoom.content }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id

const { meetingRoom, getMeetingRoom } = useMeetingRoom();

onMounted(async () => {
  await getMeetingRoom(id);
});
</script>