<template>
    <div class="fixed z-10 top-0 w-full bg-zinc-800 h-16 rounded-b flex flex-row p-2">
        <img src="/images/home.png" class="ml-6 cursor-pointer" @click="goHome"/>
        <!-- Search bar -->
        <!-- Posts -->
        <div class="flex flex-col ml-24" @mouseenter="postHover" @mouseleave="postLeave">
            <h1 class="p-6 h-full w-24 text-lg hover:bg-slate-300 rounded-t-md flex items-center cursor-default"> Posts </h1>
            <div v-if="togglePost" class=" bg-slate-300 rounded-md">
                <!-- 3 by 3 -->
                <div class="mt-6 pb-6 pr-6 flex flex-row text-zinc-500 rounded-sm font-semibold">
                    <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Chat rooms </h2>
                    <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Sell rooms </h2>
                    <h2 class="cursor-pointer p-10  hover:bg-slate-400 ml-6" @click=""> Meeting rooms </h2>
                </div>
                <!-- <h1> Chat </h1> -->
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">

import { ref } from "vue";

const togglePost = ref(false);

const postMenu = ref([
    { name: "Chat rooms", path: "/chat" },
    { name: "Sell rooms", path: "/sell" },
    { name: "Meeting rooms", path: "/meeting" },
]);

const goHome = () => { navigateTo("/") };
const moveToChat = (path: string) => { navigateTo(path) };
const moveTo = (path: string) => { navigateTo(path) };
// const moveTo = (path: string) => { navigateTo(path) };
const postHover = () => { togglePost.value = true };
const postLeave = () => { togglePost.value = false };

</script>