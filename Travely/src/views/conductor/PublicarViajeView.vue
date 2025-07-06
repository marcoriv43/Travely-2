<template>
  <section class="publicar">
    <h2>Publicar viaje</h2>

    <form @submit.prevent="publicar" class="form">

      <!-- Nombre del conductor -->
      <label>
        Nombre
        <input v-model="nuevo.nombre" required />
      </label>

      <div class="row">
        <!-- Tipo de vehículo -->
        <label>
          Tipo de vehículo
          <select v-model="nuevo.vehiculo" required>
            <option disabled value="">Seleccione</option>
            <option v-for="t in tiposVehiculo" :key="t" :value="t">
              {{ t }}
            </option>
          </select>
        </label>

        <!-- Asientos -->
        <label>
          Asientos disponibles
          <input type="number" v-model.number="nuevo.asientos" min="1" required />
        </label>
      </div>


      <!-- Ruta -->
      <label>
        Ruta
        <select v-model="nuevo.ruta" required>
          <option disabled value="">Seleccione</option>
          <option v-for="r in rutas" :key="r" :value="r">{{ r }}</option>
        </select>
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

    <!-- Opcional: lista rápida de lo publicado -->
    <h3 v-if="publicados.length">Mis viajes publicados</h3>
    <ul v-if="publicados.length">
      <li v-for="v in publicados" :key="v.id">
        {{ v.ruta }} — {{ v.asientos }} asientos — {{ v.vehiculo }}
        <span v-if="v.disponibleHoy"> (hoy)</span>
      </li>
    </ul>
  </section>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';

  const tiposVehiculo = ['Moto', 'Carro', 'Camioneta', 'Bus'];
  const rutas = [
    'Valera',
    'Carvajal',
    'Centro-Valera',
    'Country',
    'La Beatriz',
    'Trujillo',
  ];

  // modelo del formulario
  const nuevo = ref({
    nombre: '',
    vehiculo: '',
    asientos: 1,
    ruta: '',
    precio: 0,
    disponibleHoy: false,
  });

  const publicados = ref([]);

  let autoId = 1;

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

      getDataToServer();
    } catch (error) {
      console.error('Error al publicar el viaje:', error);
      alert('Hubo un error al publicar el viaje. Por favor, inténtelo nuevamente.');
    }
  };

  onMounted(() => {    
    getDataToServer();
  });

  const sendDataToServer = async (data) => {
    try {
      const response = await axios.post('http://localhost:3000/viajes/register', data);
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending data to server:', error);
    }
  };
  const getDataToServer = async () => {
    try {
      const response = await axios.get('http://localhost:3000/viajes');
      let array = response.data;
      console.log(array);

      // Actualizar publicados con los datos recibidos
      publicados.value = array.map(v => ({
        id: v.id,
        nombre: v.conductor,
        vehiculo: v.tipo_vehiculo,
        asientos: v.cantidad_asientos,
        ruta: v.ruta,
        disponibleHoy: v.disponible_hoy
      }));
    } catch (error) {
      console.error('Error obteniendo datos del servidor:', error);
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
</style>
