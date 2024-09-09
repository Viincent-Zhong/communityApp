<template>
    <div class="fixed z-10 top-0 w-full bg-zinc-800 h-16 flex flex-row p-2">
        <img src="/images/home.png" class="ml-6 cursor-pointer" @click="() => moveTo('/')"/>
        <!-- Search bar -->
        <!-- Posts -->
        <div class="flex flex-col ml-4 lg:ml-24 w-[50%]" @mouseenter="togglePost = true" @mouseleave="togglePost = false">
            <h1 class="p-6 h-full w-24 text-lg hover:bg-slate-300 rounded-md flex flex-row items-center cursor-default"> Posts </h1>
            <div v-if="togglePost" class=" bg-slate-300 rounded-md">
                <!-- 3 by 3 -->
                <div class="mt-6 pb-6 pr-6 text-zinc-500 rounded-sm font-semibold w-full">
                    <ul class="grid grid-col-3 p-1">
                        <li :class="'select-none cursor-pointer lg:p-10 p-2 mb-2 lg:ml-6  hover:bg-slate-400 col-span-1 col-start-' + (index + 1) " v-for="(postMenu, index) in postMenus">
                            <!-- Every three index move to a new row -->
                            <h2 class="lg:text-xl text-center" @click="() => moveTo(postMenu.path)"> {{ postMenu.name }} </h2>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="ml-auto h-full w-24 flex flex-row justify-end mr-10">
            <img src="/images/default-pp.jpeg" alt="pp" class="h-full rounded-full cursor-pointer" @click="() => moveTo('/profile')"/>
        </div>
    </div>
</template>

<script setup lang="ts">

import { ref } from "vue";

const togglePost = ref(false);

type PostMenu = {
    name: string,
    path: string
}

const postMenus : PostMenu[] = ref([
    { name: "Chat rooms", path: "/chat" },
    { name: "Sell rooms", path: "/sell" },
    { name: "Meeting rooms", path: "/meeting" },
    { name: "Empty", path: "/" },
]);

const moveTo = (path: string) => { navigateTo(path) };
// const postHover = () => { togglePost.value = true };
// const postLeave = () => { togglePost.value = false };

</script>