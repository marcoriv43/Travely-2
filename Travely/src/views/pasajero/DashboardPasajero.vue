<template>
    
  <h2>Dashboard de Pasajero</h2>
  <div class="contenedor">
    <div class="mitad-contenedor">
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
    </div>
    <div class="mitad-contenedor">
      <h3>Mis Viajes Activos:</h3>
      <div v-if="viajes.length === 0" class="resto-contenedor">
        <h3>No hay Viajes Activos</h3>
        <button @click="buscarViaje">Buscar Viajes</button>
      </div>
      <div v-else class="resto-contenedor">
        <h3>Resultados de la búsqueda</h3><br>
        <div class="cards-container">
          <div v-for="(viaje, idx) in viajes" class="card" :key="idx">
            <h4>{{ viaje.descripcion }}</h4><br>
            <ul>
              <li>Conductor: {{ viaje.conductor.nombre_conductor }}</li>
              <li>Vehículo: {{ viaje.vehiculo.tipo_vehiculo }} {{ viaje.vehiculo.marca }} {{ viaje.vehiculo.modelo }}</li>
              <li>Ruta: {{ viaje.ruta.salida }} - {{ viaje.ruta.llegada }}</li>
              <li>Fecha: {{ viaje.fecha }}</li>
              <li>Inician en: {{ tiempoRestante(viaje.fecha) }}</li>
              <li>Precio: ${{ viaje.precio }}</li>
              <li>Disponibilidad: {{ viaje.disponibilidad }} asientos</li>              
            </ul>
            <button @click="cancelarViaje(viaje.id_viaje)">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  </div>   
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const router = useRouter();
const authStore = useAuthStore();

const buscarViaje = () => router.push('/dashboard/buscar');
const verHistorial = () => router.push('/dashboard/historial');

onMounted(() => {
  misViajes();
});

const viajes = ref([]);

const misViajes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/pasajeros',
      { params: { id_usuario: authStore.user.id } }
    );
    let historial = response.data;
    let viajesTransformados = await Promise.all(historial.map(async element => {
      let fecha = '';
      if (element.inicia_el && element.inicia_a) {
        const fechaObj = new Date(element.inicia_el);
        const [hora, minuto] = element.inicia_a.split(":");
        fechaObj.setHours(hora, minuto);
        const dia = String(fechaObj.getDate()).padStart(2, '0');
        const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
        const año = fechaObj.getFullYear();
        const horaStr = String(hora).padStart(2, '0');
        const minStr = String(minuto).padStart(2, '0');
        fecha = `${dia}/${mes}/${año} ${horaStr}:${minStr}`;
      }
      let disponibilidad = element.capacidad;
      const pasajeroDisp = await axios.get('http://localhost:3000/viajes/disp', {
        params: { id_viaje: element.id_viaje }
      });
      disponibilidad = disponibilidad - pasajeroDisp.data.length;
      if (disponibilidad <= 0) {
        return null;
      }
      return {
        id_viaje: element.id_viaje,
        descripcion: element.descripcion,
        conductor: {
          nombre_conductor: element.nombre,
          email: element.email,
          sexo: element.sexo
        },
        vehiculo: {
          tipo_vehiculo: element.tipo_vehiculo,
          modelo: element.modelo,
          marca: element.marca,
          color: element.color
        },
        ruta: {
          nombre_ruta: element.nombre_ruta,
          salida: element.salida,
          llegada: element.llegada
        },
        estado_viaje: element.estado_viaje,
        disponibilidad,
        fecha,
        precio: element.precio
      };
    }));
    viajes.value = viajesTransformados.filter(v => v);
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    viajes.value = [];
  }
};

const cancelarViaje = async (id_viaje) => {
  try {
    await axios.delete(`http://localhost:3000/pasajeros/cancelar`, {
      params: { id_usuario: authStore.user.id,
        id_viaje
       }
    });
    misViajes();
  } catch (error) {
    console.error('Error cancelando el viaje:', error);
  }
};

function tiempoRestante(fechaStr) {
  const [fecha, hora] = fechaStr.split(' ');
  const [dia, mes, año] = fecha.split('/');
  const [h, m] = hora.split(':');
  const fechaViaje = new Date(`${año}-${mes}-${dia}T${h}:${m}:00`);
  const ahora = new Date();
  const diffMs = fechaViaje - ahora;
  if (diffMs <= 0) return 'Ya inició';
  const diffMin = Math.floor(diffMs / 60000);
  const horas = Math.floor(diffMin / 60);
  const minutos = diffMin % 60;
  if (horas > 0) {
    return `En ${horas}h ${minutos}min`;
  } else {
    return `En ${minutos}min`;
  }
}

</script>

<style scoped>

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: flex-start;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  width: 44%;
  min-width: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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