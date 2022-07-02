import { createStore } from 'vuex'

const initialState = {
  token: '',
  user: {},
  search: []
}

export default createStore({
  state: {
    token: initialState.token,
    user: initialState.user,
    search: initialState.search
  },
  mutations: {
    setToken (state, newToken) {
      state.token = newToken
    },
    setUser (state, newUser) {
      state.user = newUser
    },
    setSearch (state, newSearch) {
      state.search = newSearch
    }
  },
  actions: {
  },
  modules: {
  }
})