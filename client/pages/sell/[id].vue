<template>
  <h1 class="mt-36 text-black">Sell room with id: {{ id }}</h1>
  <div class="text-black">
    <h1>{{ sellRoom.title }}</h1>
    <p>{{ sellRoom.content }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id

const { sellRoom, getSellRoom } = useSellRoom();

onMounted(async () => {
  await getSellRoom(id);
});
</script>