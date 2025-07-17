<template>
  <section class="HistorialViajeView">
    <h2>Historico de mis viajes</h2>
    <div class="historial">
      <div v-if="viajes.length === 0" class="no-viajes">
        <p>No tienes viajes publicados.</p>
      </div>
      <div v-else class="viaje" v-for="viaje in viajes" :key="viaje.id">
        <h3>{{ viaje.descripcion }}</h3>
        <p>Vehículo: {{ viaje.vehiculo.tipo }} {{ viaje.vehiculo.modelo }} ({{ viaje.vehiculo.marca }})</p>
        <p>Ruta: {{ viaje.ruta.nombre }} ({{ viaje.ruta.salida }} - {{ viaje.ruta.llegada }})</p>
        <p>Fecha de inicio: {{ viaje.inicia_el }} a las {{ viaje.inicia_a }}</p>
        <p>Precio: ${{ viaje.precio }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import axios from 'axios';

onMounted(() => {
  misViajes();
});

const viajes = ref([]);

const misViajes = async () => {
  try {
    let id_conductor = useAuthStore().user.id;
    const response = await axios.get('http://localhost:3000/viajes', {
      params: { id_conductor }
    });
    console.log(response.data);
    
    // viajes.value = response.data;
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
  }
};
</script>

<style scoped>

</style>
