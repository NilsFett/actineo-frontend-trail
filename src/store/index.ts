import { createStore } from 'vuex'

export default createStore({
  state: {
    allCountriesByCode: null
  },
  mutations: {
    saveAllCountriesByCode (state, allCountriesByCode) {
      state.allCountriesByCode = allCountriesByCode
    }
  },
  actions: {
  },
  modules: {
  }
})
