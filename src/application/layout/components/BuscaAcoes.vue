<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { usableRoutes } from '../../router/routes';
import { useRouter } from 'vue-router';

const router = useRouter();
const model = ref();
const select = ref<HTMLElement | null>(null);
const options = ref([...usableRoutes]);

function filterFn(val: string, update: Function) {
    update(() => {
        const needle = val.toLowerCase();
        options.value = usableRoutes.filter(route =>
            route.meta.label.toLowerCase().includes(needle)
        );
    });
}


const handleShortcut = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'i') {
        event.preventDefault();
        select.value?.focus();
    }
};

onMounted(() => {
    window.addEventListener('keydown', handleShortcut);
});

onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleShortcut);
});

watch(model, () => {
    if (model.value) router.push(model.value.path);
    if (select.value) select.value.blur();
});
</script>

<template>
    <q-select ref="select" option-value="path" use-input hide-selected hide-dropdown-icon input-debounce="0"
        label="Pesquisar opções (Ctrl+i)" :options="options" v-model="model" class="inline flex-1 rounded-full w-48"
        dense borderless @filter="filterFn">
        <template v-slot:no-option>
            <q-item class="">
                <q-item-section class="text-grey">
                    No results
                </q-item-section>
            </q-item>
        </template>
        <template v-slot:option="scope">
            <q-item v-bind="scope.itemProps">
                <q-item-section avatar>
                    <q-icon :name="scope.opt.meta.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ scope.opt.meta.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </template>
    </q-select>
</template>
