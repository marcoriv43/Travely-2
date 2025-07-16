import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import DashboardAdmin from '../views/admin/DashboardAdmin.vue';
import DashboardConductor from '../views/conductor/DashboardConductor.vue';
import PublicarViajeView from '../views/conductor/PublicarViajeView.vue';
import HistorialViajeView from '../views/conductor/HistorialViajeView.vue';
import DashboardPasajero from '../views/pasajero/DashboardPasajero.vue';
import BuscarViajesView from '../views/pasajero/BuscarViajesView.vue';
import { useAuthStore } from '../stores/auth';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login', 
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
      children: [
        { path: 'admin', component: DashboardAdmin},
        { path: 'conductor', component: DashboardConductor},
        { path: 'pasajero', component: DashboardPasajero},
        { path: 'buscar', component: BuscarViajesView },
        { path:'publicar', component: PublicarViajeView},
        { path:'historial-c', component: HistorialViajeView},
      ],
    }

  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard');
  } else if (to.path === '/dashboard') {
    // Redirigir según el tipo de usuario
    const tipo = authStore.user?.tipo;
    if (tipo === 'admin') {
      next('/dashboard/admin');
    } else if (tipo === 'conductor') {
      next('/dashboard/conductor');
    } else if (tipo === 'pasajero') {
      next('/dashboard/pasajero');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;

