<template>
  <section class="publicar">
    <h2>Publicar viaje</h2>

    <form @submit.prevent="publicar" class="form">

      <label>
        Nombre
        <input v-model="nuevo.nombre" required />
      </label>

      <div class="row">
        <label>
          Tipo de vehículo
          <template v-if="vehiculos.length > 0">
            <select v-model="nuevo.vehiculo" required>
              <option disabled value="">Seleccione</option>
              <option v-for="v in vehiculos" :key="v.id || v.placa || v.nombre" :value="v.nombre || v.tipo || v.modelo">
                {{ v.nombre || v.tipo || v.modelo }} (Capacidad: {{ v.capacidad }})
              </option>
            </select>
          </template>
          <template v-else>
            <div style="display:flex;align-items:center;gap:1rem;">
              <span style="color:#b00;">No hay vehículos registrados</span>
              <button type="button" @click="agregarVehiculo">Agregar vehículo</button>
            </div>
          </template>
        </label>

        <label>
          Asientos disponibles
          <input type="number" v-model.number="nuevo.asientos" min="1" required />
        </label>
      </div>


      <label>
        Ruta
        <template v-if="rutas.length > 0">
          <select v-model="nuevo.ruta" required>
            <option disabled value="">Seleccione</option>
            <option v-for="r in rutas" :key="r.id || r.nombre || r" :value="r.nombre || r">
              {{ r.nombre || r }}
            </option>
          </select>
        </template>
        <template v-else>
          <div style="display:flex;align-items:center;gap:1rem;">
            <span style="color:#b00;">No hay rutas registradas</span>
            <button type="button" @click="agregarRuta">Agregar ruta</button>
          </div>
        </template>
      </label>

      <label>
        Precio ($)
        <input type="number" v-model.number="nuevo.precio" min="1" required />
      </label>

      <!-- Botón “Disponible hoy” -->
      <div class="row">
        <button type="button"
                :class="{ hoy: nuevo.disponibleHoy }"
                @click="nuevo.disponibleHoy = !nuevo.disponibleHoy">
          {{ nuevo.disponibleHoy ? 'Disponible HOY ✅' : 'Disponible hoy' }}
        </button>

        <!-- Publicar -->
        <button type="submit">
          Publicar
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';

const nuevo = ref({
  nombre: '',
  vehiculo: '',
  asientos: 1,
  ruta: '',
  precio: 0,
  disponibleHoy: false,
});

const publicados = ref([]);
const vehiculos = ref([]);
const rutas = ref([]);

const publicar = async () => {
  try {
    alert('¡Viaje publicado!');
    await sendDataToServer(nuevo.value);
    nuevo.value = {
      nombre: '',
      vehiculo: '',
      asientos: 1,
      ruta: '',
      precio: 0,
      disponibleHoy: false,
    };
    
  } catch (error) {
    console.error('Error al publicar el viaje:', error);
    alert('Hubo un error al publicar el viaje. Por favor, inténtelo nuevamente.');
  }
};


onMounted(() => {    
  vehiculosRegristrados();
  rutasRegistradas();
});

const sendDataToServer = async (data) => {
  try {
    const response = await axios.post('http://localhost:3000/viajes/register', data);
    console.log('Response from server:', response.data);
  } catch (error) {
    console.error('Error sending data to server:', error);
  }
};

const vehiculosRegristrados = async () => {
  try {
    const response = await axios.get('http://localhost:3000/viajes/vehiculos');
    vehiculos.value = response.data;
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    vehiculos.value = [];
  }
};

const rutasRegistradas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/viajes/rutas');
    rutas.value = response.data;
  } catch (error) {
    console.error('Error obteniendo rutas del servidor:', error);
    rutas.value = [];
  }
};

const agregarVehiculo = () => {
  alert('Funcionalidad para agregar vehículo no implementada.');
};

const agregarRuta = () => {
  alert('Funcionalidad para agregar ruta no implementada.');
};

</script>

<style scoped>
.publicar { max-width: 700px; margin: 0 auto; }
.form { display: flex; flex-direction: column; gap: 1rem; }
.row  { display: flex; gap: 1rem; flex-wrap: wrap; }
label { display: flex; flex-direction: column; flex: 1; min-width: 150px; }
input, select {
  padding: .4rem .6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  padding: .5rem 1rem;
  border: 0; cursor: pointer;
  border-radius: 6px;
  background: #111; color: #fff;
}
button.hoy { background: #2e7d32; }       /* verde cuando está activo */
</style>
