<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Consulta de Planificación Académica</h1>
    <div class="card shadow-sm mb-4">
      <div class="card-body">
        <div class="mb-3">
          <label for="profesor" class="form-label">Selecciona un Profesor:</label>
          <select id="profesor" class="form-select" v-model="selectedProfessorId" @change="fetchAcademicPlanning">
            <option value="">Selecciona un Profesor</option>
            <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
              {{ profesor.nombre }} {{ profesor.apellido }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="seccion" class="form-label">Selecciona una Sección:</label>
          <select id="seccion" class="form-select" v-model="selectedSectionId" @change="fetchAcademicPlanning">
            <option value="">Selecciona una Sección</option>
            <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
              {{ seccion.nombre }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="eventos.length > 0" class="card shadow-sm">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Eventos Académicos</h2>
        <ul class="list-group list-group-flush">
          <li v-for="evento in eventos" :key="evento.id" class="list-group-item">
            <div class="fw-bold">{{ evento.tipo }} - {{ evento.titulo }} ({{ formatDate(evento.fecha) }} {{ evento.hora }})</div>
            <div>Profesor: {{ evento.profesor_nombre }} {{ evento.profesor_apellido }}</div>
            <div>Materia: {{ evento.materia_nombre }}</div>
            <div>Sección: {{ evento.seccion_nombre }}</div>
            <div>Descripción: {{ evento.descripcion }}</div>
            <div>Ubicación: {{ evento.ubicacion }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center my-4">
      <p>No hay eventos académicos para mostrar.</p>
    </div>
    <div class="text-center mt-4">
      <button @click="goBack" class="btn btn-secondary">Volver al Inicio</button>
    </div>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      selectedProfessorId: '',
      selectedSectionId: '',
      eventos: [],
      profesores: [],
      secciones: []
    };
  },
  methods: {
    async fetchAcademicPlanning() {
      if (!this.selectedProfessorId && !this.selectedSectionId) {
        this.eventos = [];
        return;
      }

      let url = '/planificacion';
      if (this.selectedProfessorId && this.selectedSectionId) {
        url += `/profesor/${this.selectedProfessorId}/seccion/${this.selectedSectionId}`;
      } else if (this.selectedProfessorId) {
        url += `/profesor/${this.selectedProfessorId}`;
      } else if (this.selectedSectionId) {
        url += `/seccion/${this.selectedSectionId}`;
      }

      try {
        const response = await axios.get(url);
        console.log('Received data:', response.data);

        if (Array.isArray(response.data)) {
          this.eventos = response.data.map(evento => ({
            ...evento,
            fecha: evento.fecha || 'Fecha no disponible'
          }));
        } else {
          this.eventos = [{
            ...response.data,
            fecha: response.data.fecha || 'Fecha no disponible'
          }];
        }

        console.log('Eventos:', this.eventos);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchProfessors() {
      try {
        const response = await axios.get('/profesores');
        this.profesores = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSections() {
      try {
        const response = await axios.get('/secciones');
        this.secciones = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    formatDate(dateString) {
      console.log('Received dateString:', dateString); 
      if (!dateString) return 'Fecha no disponible';
      const date = new Date(dateString);
      console.log('Converted date:', date); 
      if (isNaN(date.getTime())) return 'Fecha inválida';
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    },
    goBack() {
      this.$router.push('/dashboard');
    }
  },
  created() {
    this.fetchProfessors();
    this.fetchSections();
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
}

h1, h2 {
  text-align: center;
}

.list-group-item {
  margin-bottom: 10px;
}

.card {
  margin-bottom: 20px;
}

.btn-secondary {
  background-color: #6c757d;
  border: none;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>
