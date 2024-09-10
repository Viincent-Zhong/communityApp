<template>
    <div class="pt-28">
        <div class="flex justify-center">
            <ProfileInfos :user="user"/>
        </div>
        <ProfileComments :user="user"/>
    </div>
</template>

<script setup lang="ts">
import ProfileInfos from '~/modules/profile/userInfos.vue'
import ProfileComments from '~/modules/profile/userComments.vue'

const { user, loadUser } = useUser();

onMounted(async () => {
    await loadUser();
});

</script>