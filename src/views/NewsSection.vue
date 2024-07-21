<template>
  <div class="container my-5">
    <h1 class="mb-4">Noticias destacadas</h1>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="news in newsItems" :key="news.id">
        <div class="card h-100">
          <img :src="news.image" class="card-img-top" alt="News Image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ news.title }}</h5>
            <p class="card-text">{{ news.description }}</p>
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
  name: 'NewsSections',
  data() {
    return {
      newsItems: [
        { id: 1, title: 'Dra. Jackelin y Dra. Fiorella', description: 'En la facultad de derecho estamos creciendo...', image: '/img1.jpeg' },
        { id: 2, title: 'Nuestros graduados de este año', description: 'Conoce nuestra primera promoción de graduados de este año...', image: '/img2.jpeg' },
        { id: 3, title: 'Conexión con empresas de alto valor', description: 'Te ayudamos a conectar con empresas que estén relacionadas con tu carrera...', image: '/img3.jpeg' }
      ]
    };
  }
}
</script>

<style scoped>
.btn-link {
  color: #fff;
  font-weight: 600;
  text-decoration: none;
  padding: 8px;
  border-radius: 6px;

}
.separacion {
  margin-bottom: .7rem;
}
.btn-link:hover {
  color: #fff;
}
</style>
