<template>
  <div>
    <h1 class="font-mono mt-32 ml-24 text-3xl text-zinc-800 bg-white p-6 w-fit">Hello {{ user.name }}</h1>
  </div>
</template>

<script setup lang="ts">

const { user, loadUser } = useUser();

onMounted(async () => {
  await loadUser();
});

</script>