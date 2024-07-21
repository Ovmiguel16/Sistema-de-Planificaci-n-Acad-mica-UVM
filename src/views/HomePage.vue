<template>
  <div class="container my-5">

    <!-- Hero Section -->
    <div class="row text-center mb-5">
      <div class="col-md-8 mx-auto">
        <h1 class="display-4 mb-3">Uni Valle del Momboy, construyendo tu futuro</h1>
        <p class="lead mb-4">La universidad Valle del Momboy está sumamente complacida de invitarte a que te unas a nuestra matrícula estudiantil...</p>
        <a href="/login" class="btn btn-primary btn-lg me-2">Inicia sesión</a>
        <a href="/news" class="btn btn-outline-secondary btn-lg">Leer más →</a>
      </div>
    </div>

    <!-- Features Section -->
    <div class="row text-center mb-5">
      <div class="col-md-4">
        <div class="icon-box">
          <i class="fas fa-users fa-3x text-primary mb-3"></i>
          <h4 class="h5">Buena comunidad</h4>
        </div>
      </div>
      <div class="col-md-4">
        <div class="icon-box">
          <i class="fas fa-calendar-alt fa-3x text-primary mb-3"></i>
          <h4 class="h5">Calendario de eventos próximos</h4>
        </div>
      </div>
    </div>

    <!-- News Section -->
    <h2 class="text-center mb-4">Noticias destacadas</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="item in newsItems" :key="item.id">
        <div class="card h-100">
          <img :src="item.image" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">{{ item.description }}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 separacion">
            <a href="#" class="btn-primary btn-link">Leer más</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      newsItems: [
        { id: 1, title: 'Dra. Jackelin y Dra. Fiorella', description: 'En la facultad de derecho estamos creciendo...', image: '/img1.jpeg' },
        { id: 2, title: 'Nuestros graduados de este año', description: 'Conoce nuestra primera promoción de graduados de este año...', image: '/img2.jpeg' },
        { id: 3, title: 'Conexión con empresas de alto valor', description: 'Te ayudamos a conectar con empresas que estén relacionadas con tu carrera...', image: '/img3.jpeg' }
      ]
    }
  }
}
</script>

<style scoped>
.icon-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.btn-primary {
  background-color: #4c7cff;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
}
.btn-link {
  color: #fff;
  font-weight: 600;
  text-decoration: none;

}
.separacion {
  margin-bottom: .7rem;
}
.btn-link:hover {
  color: #fff;
}
</style>
