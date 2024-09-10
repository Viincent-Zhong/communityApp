<template>
    <div class="text-black">
        <h1>Profile</h1>
        <p>{{ id }}</p>
    </div>
</template>

<script setup lang="ts">
const route = useRoute()
const id = route.params.id as string

</script>
