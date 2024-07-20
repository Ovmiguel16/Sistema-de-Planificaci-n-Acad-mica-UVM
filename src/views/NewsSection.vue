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
          <div class="card-footer bg-transparent border-top-0">
            <a href="#" class="btn btn-link">Leer más</a>
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
        { id: 1, title: 'Dra. Jackelin y Dra. Fiorella', description: 'En la facultad de derecho estamos creciendo...', image: 'path_to_image' },
        { id: 2, title: 'Nuestros graduados de este año', description: 'Conoce nuestra primera promoción de graduados de este año...', image: 'path_to_image' },
        { id: 3, title: 'Conexión con empresas de alto valor', description: 'Te ayudamos a conectar con empresas que estén relacionadas con tu carrera...', image: 'path_to_image' }
      ]
    };
  }
}
</script>

<style scoped>
/* Estilos personalizados para la sección de noticias */
</style>
