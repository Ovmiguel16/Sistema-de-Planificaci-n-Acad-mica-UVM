<template>
  <div class="container">
    <h1>Gestión de Usuarios</h1>
    <button class="btn btn-primary mb-3" @click="openAddModal">Agregar Usuario</button>
    <button class="btn btn-secondary mb-3" @click="volverInicio">Volver a Inicio</button>


    <!-- Modal Formulario -->
    <div class="modal fade" id="userModal" tabindex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="userModalLabel">{{ editMode ? 'Editar Usuario' : 'Nuevo Usuario' }}</h5>
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
                <label for="rol" class="form-label">Rol</label>
                <select class="form-select" id="rol" v-model="rol" required>
                  <option value="director">Director</option>
                  <option value="profesor">Profesor</option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveUser">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Usuarios -->
    <ul class="list-group mt-3">
      <li v-for="usuario in usuarios" :key="usuario.id" class="list-group-item">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h5 class="mb-1">{{ usuario.nombre }} {{ usuario.apellido }}</h5>
            <small>{{ usuario.correo }} | {{ usuario.telefono }} | Rol: {{ usuario.rol }}</small>
          </div>
          <div>
            <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(usuario)">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteUser(usuario.id)">
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
  name: 'ManageUsers',
  data() {
    return {
      id: null,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      rol: 'profesor',
      usuarios: [],
      editMode: false,
      modalInstance: null
    };
  },
  methods: {
    toast() {
      return useToast();
    },
    openAddModal() {
      this.resetForm();
      this.modalInstance = new Modal(document.getElementById('userModal'));
      this.modalInstance.show();
      this.editMode = false;
    },
    openEditModal(usuario) {
      this.id = usuario.id;
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.correo = usuario.correo;
      this.telefono = usuario.telefono;
      this.rol = usuario.rol;
      this.editMode = true;
      this.modalInstance = new Modal(document.getElementById('userModal'));
      this.modalInstance.show();
    },
    closeModal() {
      this.modalInstance.hide();
      this.resetForm();
    },
    async saveUser() {
      if (this.validateForm()) {
        const userData = {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          rol: this.rol
        };
        const url = this.editMode ? `/usuarios/${this.id}` : '/usuarios';
        const method = this.editMode ? 'put' : 'post';

        try {
          await axios[method](url, userData);
          this.toast().success(this.editMode ? 'Usuario actualizado correctamente' : 'Usuario agregado correctamente');
          this.fetchUsers();
          this.closeModal();
        } catch (error) {
          this.toast().error('Error al procesar la solicitud');
          console.error('Error al procesar la solicitud:', error);
        }
      }
    },
    async fetchUsers() {
      try {
        const response = await axios.get('/usuarios');
        this.usuarios = response.data;
      } catch (error) {
        this.toast().error('Error al recuperar los usuarios');
        console.error('Error al recuperar los usuarios:', error);
      }
    },
    async deleteUser(id) {
      if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        try {
          await axios.delete(`/usuarios/${id}`);
          this.toast().success('Usuario eliminado correctamente');
          this.fetchUsers();
        } catch (error) {
          this.toast().error('Error al eliminar el usuario');
          console.error('Error al eliminar el usuario:', error);
        }
      }
    },
    volverInicio() {
        this.$router.push('/dashboard');
    },

    resetForm() {
      this.id = null;
      this.nombre = '';
      this.apellido = '';
      this.correo = '';
      this.telefono = '';
      this.rol = 'profesor';
      this.editMode = false;
    },
    validateForm() {
      const valid = this.nombre && this.apellido && this.correo && this.telefono && this.rol;
      if (!valid) {
        this.toast().error('Todos los campos son obligatorios');
      }
      return valid;
    }
  },
  created() {
    this.fetchUsers();
  }
};
</script>

<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';

.card-title {
  margin-bottom: 0;
}

.card-body {
  padding: 1rem;
}
</style>
