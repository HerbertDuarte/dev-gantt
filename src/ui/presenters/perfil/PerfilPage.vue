<script setup lang="ts">
import { useAuthStore } from '../../../../infrastructure/store/auth-store';
import { storeToRefs } from 'pinia';

import FormUpdatePerfil from './FormUpdatePerfil.vue';
import { UsuarioNivel } from '../../../../domain/enum/usuario-nivel.enum';

const { user } = storeToRefs(useAuthStore());

</script>

<template>
    <q-card class="cti-card flex gap-10 !p-10">
        <div class="flex-1 flex flex-col items-center max-w-[35%]">
            <q-avatar size="128px" class="q-mb-sm">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541" />
            </q-avatar>



            <p class="text-2xl font-medium">{{ user?.nome }}</p>
            <p class="text-xs text-slate-400 pb-1">@{{ user?.login }}</p>
            <p class="text-slate-800">{{ user?.email }}</p>
            <p v-if="user?.nivel === UsuarioNivel.Administrador" class="text-slate-800">{{ user?.nivel }}</p>

        </div>
        <div class="flex-1">
            <FormUpdatePerfil :prevUsuario="user" :cancelFunc="() => $router.back()" />
        </div>
    </q-card>
</template>
