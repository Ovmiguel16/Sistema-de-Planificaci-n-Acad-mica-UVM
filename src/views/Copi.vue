<template>
  <div>
    <h1>Gestión de Eventos</h1>
    <form @submit.prevent="editMode ? updateEvent() : addEvent()">
      <input v-model="tipo" placeholder="Tipo de Evento" />
      <input v-model="titulo" placeholder="Título" />
      <textarea v-model="descripcion" placeholder="Descripción"></textarea>
      <input type="date" v-model="fecha" placeholder="Fecha" />
      <input type="time" v-model="hora" placeholder="Hora" />
      <input v-model="ubicacion" placeholder="Ubicación" />
      <select v-model="profesor_id">
        <option value="">Selecciona un Profesor</option>
        <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
          {{ profesor.nombre }} {{ profesor.apellido }}
        </option>
      </select>
      <select v-model="materia_id">
        <option value="">Selecciona una Materia</option>
        <option v-for="materia in materias" :key="materia.id" :value="materia.id">
          {{ materia.nombre }}
        </option>
      </select>
      <select v-model="seccion_id">
        <option value="">Selecciona una Sección</option>
        <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
          {{ seccion.nombre }}
        </option>
      </select>
      <button type="submit">{{ editMode ? 'Actualizar Evento' : 'Agregar Evento' }}</button>
      <button type="button" v-if="editMode" @click="cancelEdit">Cancelar</button>
    </form>
    <FullCalendar class="fullcalendar" :options="calendarOptions" />
    <ul>
      <li v-for="evento in eventos" :key="evento.id">
        {{ evento.tipo }} - {{ evento.titulo }} ({{ evento.fecha }} {{ evento.hora }})
        <br />
        Profesor: {{ evento.profesor_nombre }} {{ evento.profesor_apellido }}
        <br />
        Materia: {{ evento.materia_nombre }}
        <br />
        Sección: {{ evento.seccion_nombre }}
        <br />
        <button @click="editEvent(evento)">Editar</button>
        <button @click="deleteEvent(evento.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios';
import FullCalendar from '@fullcalendar/vue3'; // A veces puede ser así
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default {
  components: {
    FullCalendar
  },
  data() {
    return {
      id: null,
      tipo: '',
      titulo: '',
      descripcion: '',
      fecha: '',
      hora: '',
      ubicacion: '',
      profesor_id: '',
      materia_id: '',
      seccion_id: '',
      eventos: [],
      profesores: [],
      materias: [],
      secciones: [],
      editMode: false,
      calendarEvents: [],
      calendarOptions: {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      events: () => this.calendarEvents
    }
    };
  },
  methods: {
    async addEvent() {
    const newEvent = {
    tipo: this.tipo,
    titulo: this.titulo,
    descripcion: this.descripcion,
    fecha: this.fecha,
    hora: this.hora,
    ubicacion: this.ubicacion,
    profesor_id: this.profesor_id,
    materia_id: this.materia_id,
    seccion_id: this.seccion_id
  };
  try {
    const response = await axios.post('/eventos', newEvent);
    this.eventos.push(response.data);
    this.calendarEvents.push(response.data); // Añade también al calendario
    this.fetchEvents(); // Esta llamada podría ser innecesaria si ya actualizaste localmente
  } catch (error) {
    console.error(error);
  }
},
    async fetchEvents() {
        try {
            const response = await axios.get('/eventos');
            if (response && response.data) {
            this.eventos = response.data;
            this.calendarEvents = response.data.map(event => ({
                title: event.titulo,
                start: event.fecha,
                end: event.fecha,
                extendedProps: { ...event }
            }));
            } else {
            console.log('Respuesta inesperada:', response);
            this.eventos = [];
            this.calendarEvents = [];
            }
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    },
    async fetchProfessors() {
      try {
        const response = await axios.get('/profesores');
        this.profesores = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSubjects() {
      try {
        const response = await axios.get('/materias');
        this.materias = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchSections() {
      try {
        const response = await axios.get('/secciones');
        this.secciones = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async updateEvent() {
      const updatedEvent = {
        tipo: this.tipo,
        titulo: this.titulo,
        descripcion: this.descripcion,
        fecha: this.fecha,
        hora: this.hora,
        ubicacion: this.ubicacion,
        profesor_id: this.profesor_id,
        materia_id: this.materia_id,
        seccion_id: this.seccion_id
      };
      try {
        await axios.put(`/eventos/${this.id}`, updatedEvent);
        this.fetchEvents();
      } catch (error) {
        console.error(error);
      }
    },
    async deleteEvent(id) {
      try {
        await axios.delete(`/eventos/${id}`);
        this.fetchEvents();
      } catch (error) {
        console.error(error);
      }
    },
    editEvent(evento) {
      this.id = evento.id;
      this.tipo = evento.tipo;
      this.titulo = evento.titulo;
      this.descripcion = evento.descripcion;
      this.fecha = evento.fecha;
      this.hora = evento.hora;
      this.ubicacion = evento.ubicacion;
      this.profesor_id = evento.profesor_id;
      this.materia_id = evento.materia_id;
      this.seccion_id = evento.seccion_id;
      this.editMode = true;
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.id = null;
      this.tipo = '';
      this.titulo = '';
      this.descripcion = '';
      this.fecha = '';
      this.hora = '';
      this.ubicacion = '';
      this.profesor_id = '';
      this.materia_id = '';
      this.seccion_id = '';
      this.editMode = false;
    }
  },
  created() {
  Promise.all([
    this.fetchEvents(),
    this.fetchProfessors(),
    this.fetchSubjects(),
    this.fetchSections()
  ]).then(([events, professors, subjects, sections]) => {
    this.calendarEvents = events.data; // Asumiendo que fetchEvents devuelve los eventos adecuadamente
    this.profesores = professors.data;
    this.materias = subjects.data;
    this.secciones = sections.data;
  }).catch(error => {
    console.error("Error loading data:", error);
  });
},
};
</script>

<style scoped>
/* Estilos generales para la página */
div {
  font-family: 'Arial', sans-serif;
}

h1 {
  color: #333;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

input, textarea, select, button {
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  cursor: pointer;
  background-color: #5c67f2;
  color: white;
}

button:hover {
  background-color: #4a54e1;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background: #f9f9f9;
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
}

/* Estilos para los botones de editar y eliminar dentro de la lista de eventos */
li button {
  margin-right: 5px;
  padding: 5px 10px;
  font-size: 0.8rem;
  background-color: #f44336;
  color: white;
}

li button:hover {
  background-color: #d32f2f;
}

li button.edit-button {
  background-color: #4CAF50;
}

li button.edit-button:hover {
  background-color: #388E3C;
}
/* Estilos generales para el calendario */
.fullcalendar {
  max-width: 900px;
  margin: 20px auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.fc-header-toolbar { /* Personaliza la barra de herramientas del calendario */
  background: #f4f4f4;
  padding: 10px;
  border-radius: 8px 8px 0 0;
}

.fc-button { /* Estilos para los botones del calendario */
  background: #5c67f2;
  color: white;
  border: none;
}

.fc-button:hover { /* Hover state para los botones */
  background: #4a54e1;
}

.fc-button-active { /* Estilo para botones activos */
  background: #3943b7;
}

.fc-event { /* Estilo para los eventos dentro del calendario */
  background-color: #4CAF50;
  color: white;
  border: none;
  font-size: 0.9em;
}

.fc-event:hover { /* Hover state para los eventos */
  background-color: #388E3C;
}

.fc-day-today { /* Estilo para el día actual destacado */
  background-color: #e3f2fd;
}


/* Especificar estilos para el calendario si es necesario */
.fullcalendar {
  max-width: 900px;
  margin: 20px auto;
}
</style>


