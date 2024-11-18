<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { tabRoutes } from '../../../infrastructure/router/routes/tab-routes';
import { useAuthStore } from '../../../infrastructure/store/auth-store';
import { useSideBarStore } from '../states/side-bar.state';
import { Route } from '../../../infrastructure/router/config/route.interface';
const sideBarStore = useSideBarStore();
const authStore = useAuthStore();

const { user } = storeToRefs(authStore);
function canShow(tab: Route) {
    return (
        user.value?.nivel && tab.meta?.roles?.includes(user.value?.nivel) || !tab.meta?.roles
    );
}
</script>

<template>
    <q-drawer behavior="desktop" v-model="sideBarStore.control" show-if-above>
        <q-img
            src="https://cdn.shopify.com/s/files/1/0066/4574/3686/files/Abstract_LinkedIn_Background.png?v=1627912075"
            class="h-36">
            <div class="size-full bg-black/20">
                <q-avatar size="48px" class="q-mb-sm">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
                </q-avatar>
                <div class="text-weight-bold">{{ user?.nome }}</div>
                <div>{{ user?.email }}</div>
            </div>
        </q-img>
        <q-list class="p-4 text-slate-600">
            <div v-for="tab in tabRoutes">
                <q-item v-if="canShow(tab)" :key="tab.path" :to="tab.path" clickable exact class="rounded">
                    <div class="flex items-center justify-start">
                        <q-item-section avatar>
                            <q-icon :name="tab.meta.icon" />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label class="text-sm font-medium">
                                {{ tab.meta.breadcrumb[0].title }}
                            </q-item-label>
                        </q-item-section>
                    </div>
                </q-item>
            </div>
        </q-list>
    </q-drawer>
</template>
