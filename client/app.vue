<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <Toast/>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import Toast from 'primevue/toast';
</script>
