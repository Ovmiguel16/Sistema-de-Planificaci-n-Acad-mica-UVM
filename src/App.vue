<template>
  <div>
    <!-- AppBar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">SAC-Uvm</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/">Nosotros</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/news">Noticias</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/careers">Carreras</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link class="nav-link" to="/login">Inicia sesión</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
            </li>
            <li class="nav-item" v-if="isLoggedIn">
              <button class="nav-link btn btn-link" @click="logout">Cerrar sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <main class="container my-5">
      <router-view/>
    </main>

    <!-- Footer -->
    <footer class="bg-light text-center py-3 mt-auto">
      <div class="container">
        <span>©2024. Todos los derechos reservados.</span>
        <div class="social-icons mt-2">
          <a href="#"><i class="fab fa-facebook-f me-3"></i></a>
          <a href="#"><i class="fab fa-twitter me-3"></i></a>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </div>
        <div class="mt-3">
          <a href="#">Nosotros</a> · <a href="#">Noticias</a> · <a href="#">Carreras</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      isLoggedIn: state => state.auth?.isLoggedIn
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
}
</script>

<style>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main {
  flex: 1;
}
.social-icons i {
  font-size: 1.5rem;
  color: #333;
}
.social-icons i:hover {
  color: #007bff;
}
</style>
