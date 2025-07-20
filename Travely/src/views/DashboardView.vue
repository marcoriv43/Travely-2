<template>
  <div class="dashboard-container">
    <header>
      <img src="/travely.png" alt="" style="cursor:pointer;" @click="goHome" class="logo"/>
      <h1>Bienvenido, {{ nombreUsuario }}</h1>
      <button @click="historialNtf">Notificaciones</button>
      <button @click="logout" class="logout-btn">Cerrar Sesión</button>
    </header>
    
    <main class="content">
      <router-view />
    </main>
  </div>
 <div id="ntfUbicacion" class="aviso-contenedor">

  </div>

 <footer class="app-footer">
    <p>&copy; {{ new Date().getFullYear() }} Travely – Todos los derechos reservados.</p>
  </footer>
</template>


<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();
const router    = useRouter();

const goHome = () => router.push('/');
const historialNtf = () => router.push('/dashboard/notificaciones');
const nombreUsuario = authStore.user.nombre;

const logout = () => {
  authStore.logout();
  router.push('/');
}

onMounted(() => {
  revisarNtf();
})

const ntf = ref(false);
const contenidoNtf = ref([]);

const revisarNtf = async () => {
  try {
    const response = await axios.get('http://localhost:3000/ntf', 
      { params: { id_usuario: authStore.user.id } }
    );
    contenidoNtf.value = response.data;
    contenidoNtf.value.forEach(crearAviso);
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    rutas.value = [];
  }
};

const crearAviso = (notificacion) => {
  const avisoContenido = document.createElement('div');
  avisoContenido.className = 'modal-ntf';
  avisoContenido.id = `aviso-n-${notificacion.id_ntf + 1}`;

  const cerrarBtn = document.createElement('button');
  cerrarBtn.textContent = 'X';
  cerrarBtn.onclick = () => removeAlert(notificacion.id_ntf);

  const contenidoDiv = document.createElement('div');
  contenidoDiv.className = 'modal-contenido';

  const titulo = document.createElement('h3');
  titulo.textContent = notificacion.titulo_nft || 'No Title';

  const mensaje = document.createElement('p');
  mensaje.textContent = notificacion.mensaje_ntf || 'No Message';

  contenidoDiv.appendChild(cerrarBtn);
  contenidoDiv.appendChild(titulo);
  contenidoDiv.appendChild(mensaje);

  avisoContenido.appendChild(contenidoDiv);

  document.getElementById('ntfUbicacion').appendChild(avisoContenido);
};

const removeAlert = async (id) => {
  const alertElement = document.getElementById(`aviso-n-${id + 1}`);
  if (alertElement) {
    alertElement.remove();
    ntf.value = false;
  }
  try {        
    const response = await axios.put('http://localhost:3000/ntf/cambio', {
      id: id,
      estado: 'visto'
    });    
  } catch (error) {
    console.error('Error obteniendo datos del servidor:', error);
    rutas.value = [];
  }
};
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