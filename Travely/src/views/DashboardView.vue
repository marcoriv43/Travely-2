<template>
  <div class="dashboard-container">
    <header>
      <h1>Bienvenido, {{ authStore.user.nombre }}</h1>
      <button @click="authStore.logout" class="logout-btn">Cerrar Sesión</button>
    </header>
    
    <main class="content">
      <router-view />
    </main>
  </div>
  
 <footer class="app-footer">
    <p>&copy; {{ new Date().getFullYear() }} Travely – Todos los derechos reservados.</p>
  </footer>
</template>


<script setup>

import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const router    = useRouter();

const buscarViajes = () => router.push('/dashboard/buscar');
const verHistorialPasajero = () => router.push('/dashboard/historial');
const publicarViaje = () => router.push('/dashboard/publicar');
const verActivos = () => router.push('/dashboard/activos');
const verHistorialConductor = () => router.push('/dashboard/historial-c');

</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background-color: #f9f9f9;
}

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

.pasajero-dashboard .card {
  background-color: #f0f8ff;
}

.conductor-dashboard .card {
  background-color: #fff0f5;
}

</style>