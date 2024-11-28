<script setup lang="ts">
import { ref } from 'vue';
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
        <q-card class="w-fit">
            <q-date flat v-model="model" range />

            <div class="flex justify-end items-center pb-2 px-2 gap-2">
                <q-btn icon="save" flat dense class="p-2 cti-button-dark" @click="onFinish()" v-close-popup />
                <q-btn icon="close" flat dense class="p-2 cti-button" v-close-popup />
            </div>
        </q-card>

    </q-dialog>
</template>