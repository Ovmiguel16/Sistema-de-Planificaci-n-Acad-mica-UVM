<template>
  <div class="container my-5">
    <h1 class="mb-4">Carreras</h1>
    <p>Descubre las diferentes carreras que ofrecemos en la Universidad Valle del Momboy.</p>

    <div class="row">
      <div class="col-md-4 mb-4" v-for="career in careers" :key="career.id">
        <div class="card h-100">
          <img :src="career.image" class="card-img-top" alt="Career Image" style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ career.title }}</h5>
            <p class="card-text">{{ career.description }}</p>
          </div>
          <div class="card-footer bg-transparent border-top-0 separacion">
            <a href="#" class="btn-primary btn-link">Más información</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CareersPage',
  data() {
    return {
      careers: [
        { id: 1, title: 'Ingeniería de Sistemas', description: 'Forma parte de una de las carreras más demandadas del mercado...', image: '/carrera1.jpg' },
        { id: 2, title: 'Derecho', description: 'Conviértete en un profesional del derecho con nuestra carrera...', image: '/carrera2.jpg' },
        { id: 3, title: 'Administracion', description: 'Únete a nuestra prestigiosa facultad de Administracion...', image: '/carrera3.jpg' }
      ]
    }
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
