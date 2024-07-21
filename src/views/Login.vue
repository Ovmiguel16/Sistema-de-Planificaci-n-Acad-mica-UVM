<template>
  <div class="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
    <div class="card login-card w-75 shadow">
      <div class="row no-gutters">
        <div class="col-md-6 login-image d-none d-md-block">                  
          <img src='/img5.png'  />
        </div>
        <div class="col-md-6">
          <div class="login-form p-5">
            <h1 class="mb-4">Iniciar sesión</h1>
            <form @submit.prevent="login">
              <div class="form-group mb-3">
                <label for="email" class="form-label">Correo Electrónico</label>
                <input type="email" id="email" v-model="email" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label for="password" class="form-label">Contraseña</label>
                <input type="password" id="password" v-model="password" class="form-control" required />
              </div>
              <div class="form-group mb-3">
                <label for="role" class="form-label">Rol</label>
                <select v-model="role" class="form-control" required>
                  <option value="director">Director</option>
                  <option value="profesor">Profesor</option>
                </select>
              </div>
              <div class="d-flex justify-content-between align-items-center mb-3">
                <button type="submit" class="btn btn-primary">Ingresar</button>
                <a href="#" class="btn-link">Olvidé mi contraseña</a>
              </div>
              <div class="text-center mt-4">
                <p>¿No tienes una cuenta? <a href="#" class="btn-link" @click="openRegisterModal">Contactanos acá para ayudarte</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para el registro de directores -->
    <div class="modal fade" id="registerModal" tabindex="-1" aria-labelledby="registerModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">Registro de Director</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeRegisterModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="registerDirector">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre:</label>
                <input type="text" id="nombre" v-model="nombre" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="apellido" class="form-label">Apellido:</label>
                <input type="text" id="apellido" v-model="apellido" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="correo" class="form-label">Correo:</label>
                <input type="email" id="correo" v-model="correo" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="telefono" class="form-label">Teléfono:</label>
                <input type="text" id="telefono" v-model="telefono" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="usuario" class="form-label">Usuario:</label>
                <input type="text" id="usuario" v-model="usuario" class="form-control" required />
              </div>
              <div class="mb-3">
                <label for="contrasena" class="form-label">Contraseña:</label>
                <input type="password" id="contrasena" v-model="contrasena" class="form-control" required />
              </div>
              <button type="submit" class="btn btn-primary">Registrarse</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import * as bootstrap from 'bootstrap';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      usuario: '',
      contrasena: '',
      registerModal: null,
      role: 'director' // Default role
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('/usuarios/login', {
          email: this.email,
          password: this.password
        });
        if (response.data.role === this.role) {
          localStorage.setItem('token', true);
          localStorage.setItem('role', this.role);
          window.location.href = "/dashboard"        
        } else {
          alert('Rol incorrecto para este usuario');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('Credenciales inválidas');
      }
    },
    openRegisterModal() {
      this.registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
      this.registerModal.show();
    },
    closeRegisterModal() {
      this.registerModal.hide();
      this.resetRegisterForm();
    },
    async registerDirector() {
      try {
        await axios.post('/usuarios', {
          nombre: this.nombre,
          apellido: this.apellido,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          contrasena: this.contrasena,
          rol: 'director'
        });
        alert('Director registrado exitosamente');
        this.closeRegisterModal();
      } catch (error) {
        console.error('Error durante el registro:', error);
        alert('Error durante el registro');
      }
    },
    resetRegisterForm() {
      this.nombre = '';
      this.apellido = '';
      this.correo = '';
      this.telefono = '';
      this.usuario = '';
      this.contrasena = '';
    }
  }
};
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}
.login-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
.login-card {
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.login-image {
  background: #BFDBFE;
  border-radius: 15px 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.login-image-text {
  color: white;
  text-align: center;
}
.login-form {
  background-color: #f5f8fd;
  border-radius: 0 15px 15px 0;
}
.login-form h1 {
  font-weight: 500;
}
.login-form .form-control {
  border-radius: 25px;
}
.btn-primary {
  background-color: #4c7cff;
  border: none;
  padding: 8px 12px;
  border-radius: 25px;
}
.btn-link {
  color: #4c7cff;
}
</style>
