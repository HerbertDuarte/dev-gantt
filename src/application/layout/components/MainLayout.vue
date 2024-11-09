<template>
    <q-layout class="bg-slate-50" view="lHh LpR fFf">

        <q-header class="bg-slate-50">
            <q-toolbar class="flex justify-between">
                <div class="flex items-center text-slate-600 ">
                    <q-btn flat dense round icon="menu" aria-label="Menu" @click="sideBarStore.handleClick()" />

                </div>
                <div class="flex items-center gap-2">
                    <BuscaAcoes />
                    <menu-options />
                </div>
            </q-toolbar>
            <div class="flex items-center text-2xl pb-1.5 pt-3 px-10 text-slate-600">
                <q-icon class="cursor-pointer" @click="() => router.push('/')" name="home" />
                <div class="flex items-center" v-for="breadcrumb in route.meta?.breadcrumb">
                    <q-icon class="font-bold" name="chevron_right" />
                    <p @click="() => router.push(breadcrumb.path)" class="uppercase text-lg font-medium cursor-pointer">
                        {{ breadcrumb.title }}
                    </p>
                </div>
            </div>
        </q-header>

        <LeftSideBar />

        <q-page-container>

            <main class="pt-6 pb-10 px-10">
                <router-view />
            </main>
        </q-page-container>

    </q-layout>
</template>

<script setup lang="ts">
import LeftSideBar from './LeftSideBar.vue';
import menuOptions from './MenuOptions.vue';
import { useSideBarStore } from '../states/side-bar.state';
import { useRoute, useRouter } from 'vue-router';
import BuscaAcoes from './BuscaAcoes.vue';
import { Route } from '../../router/config/route.interface';
import { onMounted, ref } from 'vue';
const sideBarStore = useSideBarStore();
const rawRoute = useRoute()
const router = useRouter()
const route = rawRoute as unknown as Route;

</script>
