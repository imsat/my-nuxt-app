import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    getters: {},
    mutations: {
      SET_POSTS(state, posts) {
        state.posts = posts
      },
    },
    actions: {
      getPosts({commit}, posts) {
        commit('SET_POSTS', posts)
      }
    },
  })
}

export default createStore
