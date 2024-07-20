¿<template>
  <div class="container my-5">
    <h1 class="mb-4">Gestión de Eventos</h1>
    <!-- Botón para abrir el modal de agregar eventos -->
    <button class="btn btn-primary mb-3" @click="openModal">
      {{ editMode ? 'Editar Evento' : 'Agregar Evento' }}
    </button>
    <!-- Botón para desplegar las tarjetas de resumen -->
    <button class="btn btn-secondary mb-3" @click="toggleSummary">
      Calendario de Eventos
    </button>

    <!-- Tarjetas de Resumen que se despliegan al hacer clic en el botón -->
    <div class="row" v-if="showSummary">
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <div class="card-header bg-primary text-white">
            <h5 class="card-title">Calendario de Eventos</h5>
          </div>
          <div class="card-body">
            <FullCalendar class="fullcalendar" :options="calendarOptions" />
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <div class="card-header bg-success text-white">
            <h5 class="card-title">Total de Eventos</h5>
          </div>
          <div class="card-body">
            <span class="badge bg-success">Total: {{ eventos.length }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 mb-3">
        <div class="card shadow-sm">
          <div class="card-header bg-info text-white">
            <h5 class="card-title">Próximos Eventos</h5>
          </div>
          <div class="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item" v-for="evento in proximosEventos" :key="evento.id">
                {{ evento.titulo }} - {{ formattedDate(evento.fecha) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para Agregar/Editar Eventos -->
    <div class="modal fade" id="eventModal" tabindex="-1" aria-labelledby="eventModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="eventModalLabel">{{ editMode ? 'Editar Evento' : 'Agregar Evento' }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form ref="form">
              <div class="mb-3">
                <label for="tipo" class="form-label">Tipo de Evento</label>
                <select class="form-select" id="tipo" v-model="tipo" required>
                  <option v-for="tipo in tiposDeEvento" :key="tipo" :value="tipo">{{ tipo }}</option>
                </select>
              </div>
              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input type="text" class="form-control" id="titulo" v-model="titulo" required>
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea class="form-control" id="descripcion" v-model="descripcion" required></textarea>
              </div>
              <div class="mb-3">
                <label for="fecha" class="form-label">Fecha</label>
                <input type="date" class="form-control" id="fecha" v-model="fecha" required>
              </div>
              <div class="mb-3">
                <label for="hora" class="form-label">Hora</label>
                <input type="time" class="form-control" id="hora" v-model="hora" required>
              </div>
              <div class="mb-3">
                <label for="ubicacion" class="form-label">Ubicación</label>
                <input type="text" class="form-control" id="ubicacion" v-model="ubicacion" required>
              </div>
              <div class="mb-3">
                <label for="profesor" class="form-label">Selecciona un Profesor</label>
                <select class="form-select" id="profesor" v-model="profesor_id" required>
                  <option v-for="profesor in profesores" :key="profesor.id" :value="profesor.id">
                    {{ profesor.nombre }} {{ profesor.apellido }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="materia" class="form-label">Selecciona una Materia</label>
                <select class="form-select" id="materia" v-model="materia_id" required>
                  <option v-for="materia in materias" :key="materia.id" :value="materia.id">
                    {{ materia.nombre }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <label for="seccion" class="form-label">Selecciona una Sección</label>
                <select class="form-select" id="seccion" v-model="seccion_id" required>
                  <option v-for="seccion in secciones" :key="seccion.id" :value="seccion.id">
                    {{ seccion.nombre }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveEvent">{{ editMode ? 'Actualizar' : 'Agregar' }}</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Lista de Eventos -->
    <div class="row" v-if="!showSummary">
      <div class="col-12">
        <ul class="list-group">
          <li v-for="evento in eventos" :key="evento.id" class="list-group-item">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="mb-1">{{ evento.tipo }} - {{ evento.titulo }}</h5>
                <small>{{ formattedDate(evento.fecha) }} {{ evento.hora }}</small>
                <p>Profesor: {{ evento.profesor_nombre }} {{ evento.profesor_apellido }}</p>
                <p>Materia: {{ evento.materia_nombre }}</p>
                <p>Sección: {{ evento.seccion_nombre }}</p>
              </div>
              <div>
                <button class="btn btn-outline-secondary btn-sm me-2" @click="openEditModal(evento)">
                  <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-outline-danger btn-sm" @click="deleteEvent(evento.id)">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useToast } from 'vue-toastification';
import * as bootstrap from 'bootstrap'; 

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
      showModal: false,
      showSummary: false,
      calendarEvents: [],
      tiposDeEvento: ['evaluación', 'corte de nota', 'encuentro', 'videoconferencia', 'Especial'], // Lista de tipos de eventos
      calendarOptions: {
        plugins: [dayGridPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        events: () => this.calendarEvents
      }
    };
  },
  computed: {
    proximosEventos() {
      const hoy = new Date();
      return this.eventos.filter(evento => new Date(evento.fecha) >= hoy);
    }
  },
  methods: {
    toast() {
      return useToast();
    },
    openModal() {
      this.resetForm();
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      modal.show();
      this.editMode = false;
    },
    openEditModal(evento) {
      Object.assign(this, { ...evento, editMode: true });
      const modal = new bootstrap.Modal(document.getElementById('eventModal'));
      modal.show();
    },
    closeModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('eventModal'));
      modal.hide();
      this.resetForm();
    },
    async saveEvent() {
      if (this.validateForm()) {
        const eventData = {
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
        const url = this.editMode ? `/eventos/${this.id}` : '/eventos';
        const method = this.editMode ? 'put' : 'post';

        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios[method](url, eventData);
          this.toast().success(this.editMode ? 'Evento actualizado correctamente' : 'Evento agregado correctamente');
          this.fetchEvents();
          this.closeModal();
        } catch (error) {
          this.toast().error('Error al procesar la solicitud');
          console.error('Error al procesar la solicitud:', error);
        }
      }
    },
    async fetchEvents() {
      try {
        const response = await axios.get('/eventos');
        if (response && response.data) {
          this.eventos = response.data;
          this.updateCalendarEvents();
        } else {
          console.log('Respuesta inesperada:', response);
          this.eventos = [];
          this.calendarEvents = [];
        }
      } catch (error) {
        this.toast().error('Error al recuperar los eventos');
        console.error('Error al recuperar los eventos:', error);
      }
    },
    updateCalendarEvents() {
      this.calendarEvents = this.eventos.map(event => ({
        title: event.titulo,
        start: event.fecha,
        end: event.fecha,
        extendedProps: { ...event }
      }));
    },
    async deleteEvent(id) {
      if (confirm('¿Está seguro de que desea eliminar este evento?')) {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.delete(`/eventos/${id}`);
          this.toast().success('Evento eliminado correctamente');
          this.fetchEvents();
        } catch (error) {
          this.toast().error('Error al eliminar el evento');
          console.error('Error al eliminar el evento:', error);
        }
      }
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
    },
    validateForm() {
      const valid = this.tipo && this.titulo && this.descripcion && this.fecha && this.hora && this.ubicacion && this.profesor_id && this.materia_id && this.seccion_id;
      if (!valid) {
        this.toast().error('Todos los campos son obligatorios');
      }
      return valid;
    },
    formattedDate(dateStr) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateStr).toLocaleDateString(undefined, options);
    },
    toggleSummary() {
      this.showSummary = !this.showSummary;
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
    async fetchSubjects() {
      try {
        const response = await axios.get('/materias');
        this.materias = response.data;
      } catch (error) {
        this.toast().error('Error al recuperar las materias');
        console.error('Error al recuperar las materias:', error);
      }
    },
    async fetchSections() {
      try {
        const response = await axios.get('/secciones');
        this.secciones = response.data;
      } catch (error) {
        this.toast().error('Error al recuperar las secciones');
        console.error('Error al recuperar las secciones:', error);
      }
    }
  },
  created() {
    this.fetchEvents();
    this.fetchProfessors();
    this.fetchSubjects();
    this.fetchSections();
  }
};
</script>

<style>
@import 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css';

.fullcalendar {
  max-width: 100%;
}

.card-title {
  margin-bottom: 0;
}

.card-body {
  padding: 1rem;
}
</style>
