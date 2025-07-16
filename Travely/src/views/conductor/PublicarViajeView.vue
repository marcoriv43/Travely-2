<template>
  <section class="publicar">
    <h2>Publicar viaje</h2>

    <form @submit.prevent="publicar" class="form">

      <label>Nombre<input v-model="nuevo.nombre" required /></label>

      <label>
        Tipo de vehículo
          <template v-if="vehiculos.length > 0">
            <select v-model="nuevo.vehiculo" required>
              <option disabled value="">Seleccione</option>
              <option v-for="v in vehiculos" :key="v.id || v.tipo || v.modelo || v.marca || v.color || v.capacidad":value="v.id || v.tipo || v.modelo || v.marca || v.color || v.capacidad">
                {{v.tipo}} {{v.modelo}} {{v.marca}} {{v.color}} (Capacidad: {{ v.capacidad }})
              </option>
            </select>
          </template>
          <template v-else>
            <span style="color:#b00;">No hay vehículos registrados</span>
          </template>
          <button type="button" @click="abrirModalVehiculo">Agregar vehículo</button>
      </label>


      <label>
        Ruta
        <template v-if="rutas.length > 0">
          <select v-model="nuevo.ruta" required>
            <option disabled value="">Seleccione</option>
            <option v-for="r in rutas" :key="r.id || r.nombre || r.salida || r.llegada" :value="r.id || r.nombre || r.salida || r.llegada">
              {{ r.nombre }} ({{ r.salida }} - {{ r.llegada }})
            </option>
          </select>
        </template>
        <template v-else>
          <span style="color:#b00;">No hay rutas registradas</span>                      
        </template>
        <button type="button" @click="abrirModalRuta">Agregar ruta</button>
      </label>

      <label>
        Precio ($)
        <input type="number" v-model.number="nuevo.precio" min="1" required />
      </label>

      <div class="row">
        <button type="button"
                :class="{ hoy: nuevo.disponibleHoy }"
                @click="nuevo.disponibleHoy = !nuevo.disponibleHoy">
          {{ nuevo.disponibleHoy ? 'Disponible HOY ✅' : 'Disponible hoy' }}
        </button>

        <button type="submit">
          Publicar
        </button>
      </div>
    </form>
  </section>
  
  <div v-if="modalVehiculo" class="modal-vista">
    <div class="modal-contenido">
      <h3>Agregar vehículo</h3>
      <form @submit.prevent="registrarVehiculo">
        <label>Tipo<input v-model="vehiculoForm.tipo" required /></label>
        <label>Modelo<input v-model="vehiculoForm.modelo" required /></label>
        <label>Marca<input v-model="vehiculoForm.marca" required /></label>
        <label>Color<input v-model="vehiculoForm.color" required /></label>
        <label>Capacidad<input type="number" v-model.number="vehiculoForm.capacidad" min="1" required /></label>
        <div style="display:flex;gap:1rem;justify-content:flex-end;">
          <button type="button" @click="cerrarModalVehiculo">Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>

  <div v-if="modalRuta" class="modal-vista">
    <div class="modal-contenido">
      <h3>Agregar Rutas</h3>
      <form @submit.prevent="registrarRuta">
        <label>Nombre<input v-model="rutaForm.nombre" required /></label>
        <label>Salida<input v-model="rutaForm.salida" required /></label>
        <label>Llegada<input v-model="rutaForm.llegada" required /></label>        
        <div style="display:flex;gap:1rem;justify-content:flex-end;">
          <button type="button" @click="cerrarModalRuta">Cancelar</button>
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  </div>
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

const vehiculos = ref([]);
const modalVehiculo = ref(false);
const vehiculoForm = ref({ tipo: '', modelo: '', marca: '', color:'', capacidad: 1 });

const vehiculosRegristrados = async () => {
  try {
    const response = await axios.get('http://localhost:3000/viajes/vehiculos');
    vehiculos.value = response.data;
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    vehiculos.value = [];
  }
};

const abrirModalVehiculo = () => {
  vehiculoForm.value = { tipo: '', modelo: '', marca: '', color:'', capacidad: 1 };
  modalVehiculo.value = true;
};
const cerrarModalVehiculo = () => {
  modalVehiculo.value = false;
};

const registrarVehiculo = async () => {
  try {
    const response = await axios.post('http://localhost:3000/viajes/nuevo-vehiculo', vehiculoForm.value);
    cerrarModalVehiculo();
    vehiculosRegristrados();
  } catch (error) {
    alert('Error al registrar vehículo');
  }
};

const rutas = ref([]);
const modalRuta = ref(false);
const rutaForm = ref({ nombre: '', salida: '', llegada: '' });

const rutasRegistradas = async () => {
  try {
    const response = await axios.get('http://localhost:3000/viajes/rutas');
    rutas.value = response.data;
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    rutas.value = [];
  }
};

const abrirModalRuta = () => {
  rutaForm.value = { nombre: '', salida: '', llegada: '' };
  modalRuta.value = true;
};
const cerrarModalRuta = () => {
  modalRuta.value = false;
};

const registrarRuta = async () => {
  try {
    const response = await axios.post('http://localhost:3000/viajes/nueva-ruta', rutaForm.value);

    cerrarModalRuta();
    rutasRegistradas();
  } catch (error) {
    alert('Error al registrar la ruta');
  }
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

.modal-vista {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-contenido {
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  min-width: 300px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.2);
}
</style>
