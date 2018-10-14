import { URL } from '../../api/lections';
import { DataService as DATASERVICE } from '../../services/dataService';

const state = {
  lections: []
};

// getters
const getters = {
  getLections() {
    return state.lections;
  }
}

// actions
const actions = {
   getData({ commit }, user) {
     DATASERVICE.fetch(URL(user)).then(res => {
      commit('setLections', res);
    });
  },
  updateFav({commit}, id) {
    commit('changeFav', id);
  }
}

// mutations
const mutations = {
  setLections(state, result) {
    state.lections = result;
  },
  changeFav(state, id) {
    state.lections.forEach(lection => {
      if (lection.id === id) {
        lection.favorites = !lection.favorites;
      }
    });
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}