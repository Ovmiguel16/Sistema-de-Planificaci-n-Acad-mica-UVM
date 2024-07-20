<template>
  <div class="container">
    <h1>Gestión de Materias</h1>
    <button class="btn btn-primary mb-3" @click="openModal">Agregar Materia</button>
    <button class="btn btn-secondary mb-3" @click="volverInicio">Volver a Inicio</button>

    
    <!-- Modal Formulario -->
    <div class="modal fade" id="materiaModal" tabindex="-1" aria-labelledby="materiaModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="materiaModalLabel">{{ editMode ? 'Actualizar Materia' : 'Agregar Materia' }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="editMode ? updateSubject() : addSubject()">
              <div class="mb-3">
                <label for="codigo" class="form-label">Código de la Materia</label>
                <input type="text" class="form-control" id="codigo" v-model="codigo" required>
              </div>
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre de la Materia</label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción de la Materia</label>
                <textarea class="form-control" id="descripcion" v-model="descripcion" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="profesor" class="form-label">Selecciona un Profesor</label>
                <select class="form-select" id="profesor" v-model="profesor_id" required>
                  <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
                    {{ profesor.nombre }} {{ profesor.apellido }}
                  </option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="!formIsValid">
                {{ editMode ? 'Actualizar Materia' : 'Agregar Materia' }}
              </button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="cancelEdit">Cancelar</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Materias -->
    <ul class="list-group mt-3">
      <li class="list-group-item" v-for="materia in materias" :key="materia.id">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ materia.nombre }} ({{ materia.codigo }})</h5>
            <small>Profesor: {{ getProfessorName(materia.profesor_id) }}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(materia)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteSubject(materia.id)">
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
      codigo: '',
      nombre: '',
      descripcion: '',
      profesor_id: null,
      materias: [],
      profesores: [],
      editMode: false,
      modalInstance: null
    };
  },
  computed: {
    formIsValid() {
      return this.codigo && this.nombre && this.descripcion && this.profesor_id;
    }
  },
  methods: {
    toast() {
      return useToast();
    },
    async addSubject() {
      const newSubject = {
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        profesor_id: this.profesor_id
      };
      try {
        await axios.post('/materias', newSubject);
        this.toast().success('Materia agregada correctamente');
        this.fetchSubjects(); // Refrescar la lista de materias
        this.resetForm();
        this.modalInstance.hide();
      } catch (error) {
        this.toast().error(`Error al agregar la materia: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async fetchSubjects() {
      try {
        const response = await axios.get('/materias');
        this.materias = response.data;
      } catch (error) {
        this.toast().error(`Error al cargar las materias: ${error.response?.data?.message || 'Error desconocido'}`);
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
    async updateSubject() {
      const updatedSubject = {
        codigo: this.codigo,
        nombre: this.nombre,
        descripcion: this.descripcion,
        profesor_id: this.profesor_id
      };
      try {
        await axios.put(`/materias/${this.id}`, updatedSubject);
        this.toast().success('Materia actualizada correctamente');
        this.fetchSubjects(); // Refrescar la lista de materias
        this.resetForm();
        this.modalInstance.hide();
      } catch (error) {
        this.toast().error(`Error al actualizar la materia: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    async deleteSubject(id) {
      try {
        await axios.delete(`/materias/${id}`);
        this.toast().success('Materia eliminada correctamente');
        this.fetchSubjects();
      } catch (error) {
        this.toast().error(`Error al eliminar la materia: ${error.response?.data?.message || 'Error desconocido'}`);
        console.error(error);
      }
    },
    editSubject(materia) {
      this.id = materia.id;
      this.codigo = materia.codigo;
      this.nombre = materia.nombre;
      this.descripcion = materia.descripcion;
      this.profesor_id = materia.profesor_id;
      this.editMode = true;
    },
    openModal() {
      this.resetForm();
      this.modalInstance = new Modal(document.getElementById('materiaModal'));
      this.modalInstance.show();
    },
    openEditModal(materia) {
      this.editSubject(materia);
      this.modalInstance = new Modal(document.getElementById('materiaModal'));
      this.modalInstance.show();
    },
    cancelEdit() {
      this.resetForm();
      this.modalInstance.hide();
    },
    volverInicio() {
        this.$router.push('/dashboard');
    },
    resetForm() {
      this.id = null;
      this.codigo = '';
      this.nombre = '';
      this.descripcion = '';
      this.profesor_id = null;
      this.editMode = false;
    },
    getProfessorName(profesor_id) {
      const professor = this.profesores.find(p => p.id === profesor_id);
      return professor ? `${professor.nombre} ${professor.apellido}` : 'Desconocido';
    }
  },
  created() {
    this.fetchSubjects();
    this.fetchProfessors();
  }
};
</script>

<style>
/* Asegúrate de incluir los estilos de Bootstrap en tu proyecto */
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';
</style>
