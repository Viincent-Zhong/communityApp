<template>
  <div class="pt-24">
    <h1 class="text-black">Home</h1>
  </div>
</template>

<script setup lang="ts">

const { user, loadUser } = useUser();

onMounted(async () => {
  await loadUser();
});

</script>