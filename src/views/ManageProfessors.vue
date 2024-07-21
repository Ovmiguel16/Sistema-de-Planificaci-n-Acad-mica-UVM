<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Gestión de Profesores</h1>
    <div class="d-flex justify-content-between mb-3">
      <button class="btn btn-primary" @click="openAddModal">Agregar Profesor</button>
      <button class="btn btn-secondary" @click="volverInicio">Volver a Inicio</button>
    </div>

    <!-- Modal Formulario -->
    <div class="modal fade" id="professorModal" tabindex="-1" aria-labelledby="professorModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="professorModalLabel">{{ editMode ? 'Editar Profesor' : 'Nuevo Profesor' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form ref="form">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="nombre" required>
              </div>
              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellido" v-model="apellido" required>
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo</label>
                <input type="email" class="form-control" id="correo" v-model="correo" required>
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono</label>
                <input type="text" class="form-control" id="telefono" v-model="telefono" required>
              </div>
              <div class="mb-3">
                <label for="usuario" class="form-label">Usuario</label>
                <input type="text" class="form-control" id="usuario" v-model="usuario" required>
              </div>
              <div class="mb-3">
                <label for="contrasena" class="form-label">Contraseña</label>
                <input type="password" class="form-control" id="contrasena" v-model="contrasena" required>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveProfessor">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Profesores -->
    <ul class="list-group mt-3">
      <li v-for="profesor in profesores" :key="profesor.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ profesor.nombre }} {{ profesor.apellido }}</h5>
            <small>{{ profesor.correo }} | {{ profesor.telefono }} | Usuario: {{ profesor.usuario }}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(profesor)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteProfessor(profesor.id)">
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
  name: 'ManageProfessors',
  data() {
    return {
      id: null,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      usuario: '',
      contrasena: '',
      profesores: [],
      editMode: false,
      modalInstance: null,
      rules: {
        required: value => !!value || 'Requerido.',
        email: value => /^[^@]+@uvm\.edu\.ve$/.test(value) || 'El correo debe ser un email institucional con @uvm.edu.ve.',
        minLength: min => value => value.length >= min || `Al menos ${min} caracteres.`,
        password: value => /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/.test(value) || 'La contraseña debe tener al menos 8 caracteres y contener números y letras.'
      }
    };
  },
  methods: {
    toast() {
      return useToast();
    },
    openAddModal() {
      this.resetForm();
      this.modalInstance = new Modal(document.getElementById('professorModal'));
      this.modalInstance.show();
      this.editMode = false;
    },
    openEditModal(profesor) {
      this.id = profesor.id;
      this.nombre = profesor.nombre;
      this.apellido = profesor.apellido;
      this.correo = profesor.correo;
      this.telefono = profesor.telefono;
      this.usuario = profesor.usuario;
      this.contrasena = ''; // La contraseña no se muestra por seguridad
      this.editMode = true;
      this.modalInstance = new Modal(document.getElementById('professorModal'));
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
      this.resetForm();
    },
    async saveProfessor() {
      if (this.validateForm()) {
        const professorData = {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena
        };
        const url = this.editMode ? `/profesores/${this.id}` : '/profesores';
        const method = this.editMode ? 'put' : 'post';

        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios[method](url, professorData);
          await axios[method]('/usuarios', {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          rol: 'profesor',
          contrasena:  this.contrasena
        });
          this.toast().success(this.editMode ? 'Profesor actualizado correctamente' : 'Profesor agregado correctamente');
          this.fetchProfessors();
          this.closeModal();
        } catch (error) {
          this.toast().error('Error al procesar la solicitud');
          console.error('Error al procesar la solicitud:', error);
        }
      }
    },
    async fetchProfessors() {
      try {
        const response = await axios.get('/profesores');
        this.profesores = response.data;
      } catch (error) {
        this.toast().error('Error al recuperar los profesores');
        console.error('Error al recuperar los profesores:', error);
      }
    },
    async deleteProfessor(id) {
      if (confirm('¿Está seguro de que desea eliminar este profesor?')) {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.delete(`/profesores/${id}`);
          this.toast().success('Profesor eliminado correctamente');
          this.fetchProfessors();
        } catch (error) {
          this.toast().error('Error al eliminar el profesor');
          console.error('Error al eliminar el profesor:', error);
        }
      }
    },
    resetForm() {
      this.id = null;
      this.nombre = '';
      this.apellido = '';
      this.correo = '';
      this.telefono = '';
      this.usuario = '';
      this.contrasena = '';
      this.editMode = false;
    },
    validateForm() {
      const valid = this.nombre && this.apellido && this.correo && this.telefono && this.usuario && this.contrasena;
      if (!valid) {
        this.toast().error('Todos los campos son obligatorios');
      }
      return valid;
    },
    volverInicio() {
      this.$router.push('/dashboard');
    }
  },
  created() {
    this.fetchProfessors();
  }
};
</script>

<style scoped>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';

.container {
  max-width: 800px;
}

h1 {
  text-align: center;
}

.d-flex {
  justify-content: space-between;
}

.modal-content {
  border-radius: 0.5rem;
}

.list-group-item {
  margin-bottom: 10px;
}
</style>
