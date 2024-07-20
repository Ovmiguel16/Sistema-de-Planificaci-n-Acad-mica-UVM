<template>
  <div class="d-flex vh-100">
    <!-- Sidebar -->
    <div class="sidebar bg-primary text-white p-3">
      <h3 class="text-center">Sistema Académico</h3>
      <ul class="nav flex-column">
        <li class="nav-item" v-if="role === 'director'">
          <router-link class="nav-link d-flex align-items-center" to="/users">
            <i class="fas fa-users me-2"></i> Usuarios
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director'">
          <router-link class="nav-link d-flex align-items-center" to="/planning">
            <i class="fas fa-calendar-alt me-2"></i> Planes
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director'">
          <router-link class="nav-link d-flex align-items-center" to="/professors">
            <i class="fas fa-chalkboard-teacher me-2"></i> Profesores
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director' || role === 'profesor'">
          <router-link class="nav-link d-flex align-items-center" to="/subjects">
            <i class="fas fa-book me-2"></i> Materias
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director' || role === 'profesor'">
          <router-link class="nav-link d-flex align-items-center" to="/events">
            <i class="fas fa-calendar-check me-2"></i> Eventos
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director' || role === 'profesor'">
          <router-link class="nav-link d-flex align-items-center" to="/sections">
            <i class="fas fa-th-list me-2"></i> Secciones
          </router-link>
        </li>
        <li class="nav-item" v-if="role === 'director'">
          <router-link class="nav-link d-flex align-items-center" to="/trimesters">
            <i class="fas fa-stream me-2"></i> Trimestres
          </router-link>
        </li>
        <li class="nav-item mt-3">
          <router-link class="nav-link d-flex align-items-center" to="/logout">
            <i class="fas fa-sign-out-alt me-2"></i> Salir
          </router-link>
        </li>
      </ul>
    </div>

    <!-- Main content -->
    <div class="content flex-grow-1 p-4">
      <h1 class="mb-4 text-center">Bienvenido al Dashboard</h1>
      <div v-if="role === 'director'">
        <ManageProfessors />
        <ManageUsers />
      </div>
      <div v-if="role === 'profesor'">
        <ManageSubjects />
        <ManageEvents />
      </div>
    </div>
  </div>
</template>

<script>
import ManageProfessors from '@/views/ManageProfessors.vue';
import ManageSubjects from "@/views/ManageSubjects.vue";
import ManageEvents from '@/views/ManageEvents.vue';
import ManageUsers from '@/views/ManageUsers.vue';

export default {
  name: 'DashboardPage',
  components: {
    ManageProfessors,
    ManageSubjects,
    ManageEvents,
    ManageUsers
  },
  computed: {
    role() {
      return localStorage.getItem('role');
    }
  }
};
</script>

<style scoped>
.d-flex {
  display: flex;
  height: 100%;
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #004085; 
  color: white;
  border-right: 1px solid #ccc;
  transition: width 0.3s ease;
  overflow-y: auto;
}

.sidebar:hover {
  width: 280px;
}

.sidebar h3 {
  font-weight: 600;
}

.nav-link {
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 0.75rem 1rem;
  color: white;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #0056b3;
  color: white;
}

.nav-link i {
  font-size: 1.2rem;
}

.content {
  flex-grow: 1;
  background-color: #f8f9fa;
  overflow-y: auto;
}

h1 {
  color: #004085;
}
</style>
