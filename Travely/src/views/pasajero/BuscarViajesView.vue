<template>
  <section class="buscador">
    <h2>Buscar viaje</h2>
  
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();

const router = useRouter();

</script>

<style scoped>
.buscador { max-width:900px; margin:0 auto; }
.form { display:flex; flex-direction:column; gap:1rem; margin-bottom:1.5rem; }
.row { display:flex; gap:1rem; flex-wrap:wrap; }
label { display:flex; flex-direction:column; flex:1; min-width:150px; }
input { padding:.4rem .6rem; border:1px solid #ccc; border-radius:4px; }
button { padding:.4rem .8rem; background:#111; color:#fff; border:0; border-radius:5px; cursor:pointer; }
.tabla { width:100%; border-collapse:collapse; }
.tabla th, .tabla td { border:1px solid #ddd; padding:.4rem; text-align:center; }
.tabla th { background:#f4f4f4; }
</style>
