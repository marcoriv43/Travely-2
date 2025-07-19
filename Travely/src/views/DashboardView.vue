<template>
  <div class="dashboard-container">
    <header>
      <img src="/travely.png" alt="" style="cursor:pointer;" @click="goHome" class="logo"/>
      <h1>Bienvenido, {{ nombreUsuario }}</h1>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
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

const goHome = () => router.push('/');

const nombreUsuario = authStore.user.nombre;

const logout = () => {
  authStore.logout();
  router.push('/');
}

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

.pasajero-dashboard .card {
  background-color: #f0f8ff;
}

.conductor-dashboard .card {
  background-color: #fff0f5;
}

.logo {
  padding: 5px 5px 0px 5px;
  width: 70px;
}

</style>