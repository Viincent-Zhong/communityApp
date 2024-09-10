<template>
    <div class="ml-10 lg:ml-24 mt-24 w-full">
        <!-- Create post -->
        <div class="h-24 w-48 p-2 lg:p-6 bg-amber-500 rounded-xl cursor-pointer" @click="() => toggleCreateModal = true">
            <h1 class="select-none font-mono text-xl text-center text-zinc-800 "> Create Sell room</h1>
            <!-- Modal -->
        </div>
        <Modal v-if="toggleCreateModal" :closeModal="() => closeCreateModal()">
            <div class="bg-zinc-800 p-6 rounded-xl w-[50rem]">
                <!-- Room name -->
                <div class="w-full flex flex-row items-center">
                    <h1 class="text-xl w-[20%]">Room name</h1>
                    <InputText v-model="roomName" class="ml-10 w-full" placeholder=""/>
                </div>
                <!-- Description -->
                <div class="mt-10 w-full flex flex-row items-center">
                    <h1 class="text-xl w-[20%]">Content</h1>
                    <Textarea v-model="description" class="ml-10 w-full min-h-48 h-48" />
                </div>
                <div class="mt-10 w-full flex flex-row items-center">
                    <h1 class="text-xl w-[20%]">Date</h1>
                    <DatePicker v-model="date" class="w-full ml-10" showTime hourFormat="12"/>
                </div>
                <div class="mt-10 w-full flex flex-row items-center justify-center">
                        <h1 class="ml-4 text-lg">Item</h1>
                        <InputText v-model="item" class="ml-4 w-[10rem]" placeholder=""/>
                </div>
                <div class="mt-2 w-full flex flex-row items-center">
                    <h1 class="ml-4 text-lg">Quantity</h1>
                        <InputNumber v-model="quantity" class="ml-4 w-[10rem]" placeholder=""/>
                        <h1 class="ml-24 text-lg">Price</h1>
                        <InputNumber v-model="price" class="ml-4 w-[10rem]" placeholder=""/>
                </div>
                <!-- Submit button -->
                <div class="w-full flex justify-end mt-4">
                    <Button label="Create" @click="() => createRoom()"/>
                </div>
            </div>
        </Modal>

        <!-- Sell rooms list -->
        <div>
            <div class="mt-10">
                <h1 class="text-4xl underline text-zinc-800">Sell rooms</h1>
            </div>
            <div class="mt-10">
                <ul>
                    <li v-for="sellRoom in sellRooms" :key="sellRoom.id" class="w-[70%] p-4 lg:p-6 bg-slate-200 mb-10"
                    @click="() => {router.push(`/sell/${sellRoom.id}`)}">
                            <!-- Creator infos -->
                            <div class="flex flex-row items-center">
                                <!-- Add redirection on pp to user profile -->
                                <img src="/images/default-pp.jpeg" alt="pp" class="h-16 w-16 rounded-full cursor-pointer" @click="() => {router.push('/profile/' + sellRoom.authorId)}"/>
                                <div class="ml-6">
                                    <h1 class="text-3xl text-zinc-800">{{sellRoom.author}}</h1>
                                    <p class="text-lg font-thin text-zinc-800">{{sellRoom.createdAt}}</p>
                                </div>
                            </div>
                            <!-- Room infos -->
                            <div class="w-full mt-10">
                                <h1 class="w-full text-3xl underline font-mono text-zinc-800">Selling {{sellRoom.quantity}} {{ sellRoom.item }} for {{ sellRoom.price }} usd</h1>
                                <h1 class="mt-4 w-full text-2xl underline font-mono text-zinc-800">Scheduled for {{ sellRoom.date }}</h1>
                                <h1 class="w-full text-center text-5xl font-mono text-zinc-800">{{ sellRoom.title }}</h1>
                                <p class="mt-10 text-xl text-zinc-800">{{ sellRoom.content }}</p>
                            </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import Modal from '~/modules/modal/modal.vue'
import { ref } from "vue";
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import InputNumber from 'primevue/inputnumber';
import DatePicker from 'primevue/datepicker';
import { useRouter } from '#app';

const router = useRouter();
const { sellRooms, createSellRoom, getSellRooms } = useSellRoom();

const closeCreateModal = () => {
    toggleCreateModal.value = false;
    description.value = '';
    roomName.value = '';
    date.value = '';
    item.value = '';
    quantity.value = 0;
    price.value = 0;
}

onMounted(async () => {
    await getSellRooms();
});

const createRoom = async () => {
    await createSellRoom(roomName.value, description.value, date.value, item.value, quantity.value, price.value);
    window.location.reload();
}

const toggleCreateModal = ref(false);
const description = ref('');
const roomName = ref('');
const date = ref('');
const item = ref('');
const quantity = ref(0);
const price = ref(0);

</script>