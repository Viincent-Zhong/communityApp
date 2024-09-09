<template>
    <div class="mt-6 pb-6 pr-6 flex flex-row text-zinc-500 rounded-sm font-semibold">
        <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Chat rooms </h2>
        <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Sell rooms </h2>
        <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Meeting rooms </h2>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    posts: Array<{}>
}>();

</script>