<template>
  <div class="container">
    <h1>Gestión de Secciones</h1>
    <button class="btn btn-primary mb-3" @click="openModal">Agregar Sección</button>

    <!-- Modal Formulario -->
    <div class="modal fade" id="sectionModal" tabindex="-1" aria-labelledby="sectionModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="sectionModalLabel">{{ editMode ? 'Actualizar Sección' : 'Agregar Sección' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editMode ? updateSection() : addSection()">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre de la Sección</label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" required>
              </div>
              <div class="mb-3">
                <label for="grupo" class="form-label">Grupo</label>
                <input type="text" class="form-control" id="grupo" v-model="grupo" required>
              </div>
              <div class="mb-3">
                <label for="profesor" class="form-label">Selecciona un Profesor</label>
                <select class="form-select" id="profesor" v-model="profesor_id" required>
                  <option value="">Selecciona un Profesor</option>
                  <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
                    {{ profesor.nombre }} {{ profesor.apellido }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">{{ editMode ? 'Actualizar Sección' : 'Agregar Sección' }}</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Secciones -->
    <ul class="list-group mt-3">
      <li v-for="seccion in secciones" :key="seccion.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ seccion.nombre }} (Grupo: {{ seccion.grupo }})</h5>
            <small>Profesor: {{ seccion.profesor_nombre }} {{ seccion.profesor_apellido }}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(seccion)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteSection(seccion.id)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios';
import { useToast } from 'vue-toastification';
import { Modal } from 'bootstrap';

export default {
  data() {
    return {
      id: null,
      nombre: '',
      grupo: '',
      profesor_id: '',
      secciones: [],
      profesores: [],
      editMode: false,
      modalInstance: null
    };
  },
  methods: {
    toast() {
      return useToast();
    },
    async addSection() {
      const newSection = {
        nombre: this.nombre,
        grupo: this.grupo,
        profesor_id: this.profesor_id
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.post('/secciones', newSection);
        this.toast().success('Sección agregada correctamente');
        this.fetchSections(); // Refrescar la lista de secciones
        this.resetForm();
        this.modalInstance.hide();
      } catch (error) {
        this.toast().error(`Error al agregar la sección: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async fetchSections() {
      try {
        const response = await axios.get('/secciones');
        this.secciones = response.data;
      } catch (error) {
        this.toast().error(`Error al cargar las secciones: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async fetchProfessors() {
      try {
        const response = await axios.get('/profesores');
        this.profesores = response.data;
      } catch (error) {
        this.toast().error(`Error al cargar los profesores: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async updateSection() {
      const updatedSection = {
        nombre: this.nombre,
        grupo: this.grupo,
        profesor_id: this.profesor_id
      };
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.put(`/secciones/${this.id}`, updatedSection);
        this.toast().success('Sección actualizada correctamente');
        this.fetchSections(); // Refrescar la lista de secciones
        this.resetForm();
        this.modalInstance.hide();
      } catch (error) {
        this.toast().error(`Error al actualizar la sección: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async deleteSection(id) {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.delete(`/secciones/${id}`);
        this.toast().success('Sección eliminada correctamente');
        this.fetchSections(); // Refrescar la lista de secciones
      } catch (error) {
        this.toast().error(`Error al eliminar la sección: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    editSection(seccion) {
      this.id = seccion.id;
      this.nombre = seccion.nombre;
      this.grupo = seccion.grupo;
      this.profesor_id = seccion.profesor_id;
      this.editMode = true;
    },
    openModal() {
      this.resetForm();
      this.modalInstance = new Modal(document.getElementById('sectionModal'));
      this.modalInstance.show();
    },
    openEditModal(seccion) {
      this.editSection(seccion);
      this.modalInstance = new Modal(document.getElementById('sectionModal'));
      this.modalInstance.show();
    },
    closeModal() {
      this.resetForm();
      if (this.modalInstance) {
        this.modalInstance.hide();
      }
    },
    resetForm() {
      this.id = null;
      this.nombre = '';
      this.grupo = '';
      this.profesor_id = '';
      this.editMode = false;
    }
  },
  created() {
    this.fetchSections();
    this.fetchProfessors();
  }
};
</script>

<style>
/* Asegúrate de incluir los estilos de Bootstrap en tu proyecto */
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
</style>
