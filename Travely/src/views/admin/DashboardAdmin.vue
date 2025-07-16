<template>
    <div>
        <h2>Dashboard de Admin</h2>
        <div class="card">
            <h3>Buscar Viajes</h3>
            <p>Encuentra conductores disponibles cerca de ti.</p>
            <button @click="router.push('/dashboard/buscar')">Buscar Viajes</button>
        </div>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
const router = useRouter();
const authStore = useAuthStore();
</script>