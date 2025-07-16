<template>
    <h2>Dashboard de Conductor</h2>
    <div class="card">
        <h3>Ofertas de Viaje</h3>
        <p>Publica un nuevo viaje disponible.</p>
        <button @click="router.push('/dashboard/publicar')">Publicar Viaje</button>
    </div>
    <div class="card">
        <h3>Historial de Viajes</h3>
        <p>Revisa tus viajes anteriores.</p>
        <button @click="router.push('/dashboard/historial-c')">Ver Viajes</button>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = useRouter();
const authStore = useAuthStore();
</script>