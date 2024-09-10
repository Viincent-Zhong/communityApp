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

const { user, getUser } = useUser();
const route = useRoute()
const id = route.params.id as string

onMounted(async () => {
    await getUser(id);
});

</script>