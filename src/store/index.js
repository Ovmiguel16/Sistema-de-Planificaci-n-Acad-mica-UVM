import { createStore } from 'vuex';

export default createStore({
  state: {
    auth: {
      isLoggedIn: false,
      token: null,
      role: null
    }
  },
  mutations: {
    login(state, { token, role }) {
      state.auth.isLoggedIn = true;
      state.auth.token = token;
      state.auth.role = role;
    },
    logout(state) {
      state.auth.isLoggedIn = false;
      state.auth.token = null;
      state.auth.role = null;
    }
  },
  actions: {
    login({ commit }, credentials) {
      commit('login', credentials);
    },
    logout({ commit }) {
      commit('logout');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
  }
});
