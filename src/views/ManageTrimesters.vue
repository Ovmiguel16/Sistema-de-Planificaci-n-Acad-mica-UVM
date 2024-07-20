<template>
    <div class="container my-5">
      <h1 class="mb-4">Gestión de Trimestres</h1>
      <button class="btn btn-primary mb-3" @click="openModal">Agregar Trimestre</button>
      <button class="btn btn-secondary mb-3" @click="volverInicio">Volver a Inicio</button>
  
      <!-- Modal para Agregar/Editar Trimestre -->
      <div class="modal fade" id="trimesterModal" tabindex="-1" aria-labelledby="trimesterModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="trimesterModalLabel">{{ editMode ? 'Editar Trimestre' : 'Agregar Trimestre' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form ref="form">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" class="form-control" id="nombre" v-model="nombre" required>
                </div>
                <div class="mb-3">
                  <label for="fechaInicio" class="form-label">Fecha de Inicio</label>
                  <input type="date" class="form-control" id="fechaInicio" v-model="fechaInicio" required>
                </div>
                <div class="mb-3">
                  <label for="fechaFin" class="form-label">Fecha de Fin</label>
                  <input type="date" class="form-control" id="fechaFin" v-model="fechaFin" required>
                </div>
                <div class="mb-3">
                  <label for="diasFestivos" class="form-label">Días Festivos</label>
                  <input type="text" class="form-control" id="diasFestivos" v-model="diasFestivos" required>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Cancelar</button>
              <button type="button" class="btn btn-primary" @click="saveTrimester">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Lista de Trimestres -->
      <ul class="list-group mt-3">
        <li v-for="trimestre in trimestres" :key="trimestre.id" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ trimestre.nombre }}</h5>
              <small>{{ formatDate(trimestre.fechaInicio) }} - {{ formatDate(trimestre.fechaFin) }}</small>
              <p>Días Festivos: {{ trimestre.diasFestivos }}</p>
            </div>
            <div>
              <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(trimestre)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm" @click="deleteTrimester(trimestre.id)">
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
    name: 'ManageTrimesters',
    data() {
      return {
        id: null,
        nombre: '',
        fechaInicio: '',
        fechaFin: '',
        diasFestivos: '',
        trimestres: [],
        editMode: false,
        modalInstance: null,
      };
    },
    methods: {
      toast() {
        return useToast();
      },
      openModal() {
        this.resetForm();
        this.modalInstance = new Modal(document.getElementById('trimesterModal'));
        this.modalInstance.show();
        this.editMode = false;
      },
      openEditModal(trimestre) {
        this.id = trimestre.id;
        this.nombre = trimestre.nombre;
        this.fechaInicio = trimestre.fechaInicio;
        this.fechaFin = trimestre.fechaFin;
        this.diasFestivos = trimestre.diasFestivos;
        this.editMode = true;
        this.modalInstance = new Modal(document.getElementById('trimesterModal'));
        this.modalInstance.show();
      },
      closeModal() {
        this.modalInstance.hide();
        this.resetForm();
      },
      async saveTrimester() {
        const trimesterData = {
          nombre: this.nombre,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          diasFestivos: this.diasFestivos,
        };
        const url = this.editMode ? `/trimestres/${this.id}` : '/trimestres';
        const method = this.editMode ? 'put' : 'post';
  
        try {
          await axios[method](url, trimesterData);
          this.toast().success(this.editMode ? 'Trimestre actualizado correctamente' : 'Trimestre agregado correctamente');
          this.fetchTrimesters();
          this.closeModal();
        } catch (error) {
          this.toast().error('Error al procesar la solicitud');
          console.error('Error al procesar la solicitud:', error);
        }
      },
      async fetchTrimesters() {
        try {
          const response = await axios.get('/trimestres');
          this.trimestres = response.data;
        } catch (error) {
          this.toast().error('Error al recuperar los trimestres');
          console.error('Error al recuperar los trimestres:', error);
        }
      },
      async deleteTrimester(id) {
        if (confirm('¿Está seguro de que desea eliminar este trimestre?')) {
          try {
            await axios.delete(`/trimestres/${id}`);
            this.toast().success('Trimestre eliminado correctamente');
            this.fetchTrimesters();
          } catch (error) {
            this.toast().error('Error al eliminar el trimestre');
            console.error('Error al eliminar el trimestre:', error);
          }
        }
      },
      resetForm() {
        this.id = null;
        this.nombre = '';
        this.fechaInicio = '';
        this.fechaFin = '';
        this.diasFestivos = '';
        this.editMode = false;
      },
      formatDate(dateStr) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString(undefined, options);
      },
      volverInicio() {
        this.$router.push('/dashboard');
      },
    },
    
    created() {
      this.fetchTrimesters();
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
  }
  </style>
  