<template>
    
  <h2>Dashboard de Pasajero</h2>
  <div class="card">
    <h3>Buscar Viajes</h3>
    <p>Encuentra conductores disponibles cerca de ti.</p>
    <button @click="buscarViaje">Buscar Viajes</button>
  </div>
  <div class="card">
    <h3>Historial de Viajes</h3>
    <p>Revisa tus viajes anteriores.</p>
    <button @click="verHistorial">Ver Viajes</button>
  </div>
  
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const buscarViaje = () => router.push('/dashboard/buscar');
const verHistorial = () => router.push('/dashboard/historial');
</script>

<style scoped>

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card h3 {
  margin-top: 0;
}

.card button {
  background-color: #000;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

</style>