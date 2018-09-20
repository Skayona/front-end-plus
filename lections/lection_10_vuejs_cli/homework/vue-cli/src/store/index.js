import Vue from 'vue'
import Vuex from 'vuex'
import lections from './modules/lections'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    lections
  }
})
