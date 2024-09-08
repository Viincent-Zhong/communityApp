<template>
  <div>
    <div class="bg-slate-100 h-screen fixed left-0 top-0 w-full -z-10"></div>
    <main>
      <Header/>
      <slot/>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/modules/profile/header.vue'

</script>