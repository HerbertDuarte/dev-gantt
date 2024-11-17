<script setup lang="ts">
import { ref, Ref } from 'vue';
defineProps<{
    dates: {
        from: string | null;
        to: string | null;
    };
}>();

const emits = defineEmits(['defineDates']);

const model = ref({
    from: "",
    to: ""
})

function onFinish() {
    emits('defineDates', model.value);
}
</script>

<template>
    <q-dialog ref="dialogRef">
        <q-card class="w-screen rounded-lg">
            <q-date flat class="w-full" v-model="model" range />

            <div class="flex justify-end items-center p-2 gap-2">
                <q-btn flat dense label="salvar" class="py-2 px-4 cti-button-dark" @click="onFinish()" v-close-popup />
                <q-btn flat dense label="cancelar" class="py-2 px-4 bg-red-50 text-red-500" v-close-popup />
            </div>
        </q-card>

    </q-dialog>
</template>