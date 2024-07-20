import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

loadFonts()

const app = createApp(App);

// Inicializar el estado de autenticación desde localStorage
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (token && role) {
  store.commit('login', { token, role });
}

app.use(router);
app.use(store);
app.use(vuetify);
app.use(Toast, {
  position: 'top-right',
  timeout: 5000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  closeButton: 'button',
  icon: true,
  rtl: false
});

app.mount('#app');
