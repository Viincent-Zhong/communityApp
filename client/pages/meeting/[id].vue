<template>
    <h1 class="mt-36 text-black">Meeting room with id: {{ id }}</h1>
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  const id = route.params.id
  </script>