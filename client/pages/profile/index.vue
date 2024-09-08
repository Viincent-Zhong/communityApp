<template>
    <div class="pt-28">
        <div class="flex justify-center">
            <ProfileInfos :user="localUser"/>
        </div>
        <ProfileComments :user="localUser"/>
    </div>
</template>

<script setup lang="ts">
import ProfileInfos from '~/modules/profile/userInfos.vue'
import ProfileComments from '~/modules/profile/userComments.vue'

const localUser = ref({});
// const { user, loadUser } = useUser();

onMounted(async () => {
    // await loadUser();
    // // User logged in ?
    // if (!user.value.name) {
    //     navigateTo("/auth");
    // localUser.value = user.value;
    // }
});

</script>