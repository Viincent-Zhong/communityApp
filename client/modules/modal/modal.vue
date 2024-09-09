<template>
    <div class="absolute z-40 w-screen h-screen top-0 left-0 bg-zinc-800 opacity-50" @click="props.closeModal">
    </div>
    <div class="absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <slot/>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
  closeModal: Function;
}>();

</script>