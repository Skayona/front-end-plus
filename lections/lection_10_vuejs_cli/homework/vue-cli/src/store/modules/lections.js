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
  async getData({ commit }, user)  {
    await DATASERVICE.fetch(URL(user)).then(res => {
      commit('setLections', res)
    });
  }
}

// mutations
const mutations = {
  setLections(state, result) {
    state.lections = result;
  }
}

export default {
  // namespaced: true,
  state,
  getters,
  actions,
  mutations
}