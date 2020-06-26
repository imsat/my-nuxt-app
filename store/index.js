import Vuex from 'vuex'
import axios from 'axios'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      }
    },
    mutations: {
      SET_POSTS(state, posts) {
        state.loadedPosts = posts
      },
      ADD_POST(state, post) {
        state.loadedPosts.push(post)
      },
      EDIT_POST(state, editedPost) {
        const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)
        state.loadedPosts[postIndex] = editedPost
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return axios.get(process.env.baseUrl + '/posts.json')
          .then(res => {
            console.log(res)
            const postArray = []
            for (const key in res.data) {
              // postArray.push(res.data[key])
              postArray.push({...res.data[key], id: key})
            }
            vuexContext.commit('SET_POSTS', postArray)
          })
          .catch(e => {
            console.log(e)
            context.error(e)
          })
      },
      addPost(vuexContext, post) {
        const createdPost = {
          ...post, updatedDate: new Date()
        }
        return axios.post(process.env.baseUrl +  '/posts.json', createdPost)
          .then(res => {
            vuexContext.commit('ADD_POST', {...createdPost, id: res.data.name});
            this.$router.push('/admin')
          })
          .catch(err => {
            console.log(err)
          })
      },
      editedPost(vuexContext, editedPost) {
        return axios.put(process.env.baseUrl +  '/posts/' + editedPost.id + '.json', editedPost)
          .then(res => {
            vuexContext.commit('EDIT_POST', editedPost)
          })
          // .catch(e => context.error(e))
          .catch(e => console.log(e))
      },
      // nuxtServerInit(vuexContext, context) {
      //   // if(!process.client){
      //   //   console.log(context.req.session)
      //   // }
      //   return new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       vuexContext.commit('SET_POSTS',[
      //           {
      //             id: 1,
      //             title: 'First post',
      //             previewText: 'This is my first post',
      //             thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
      //           },
      //           {
      //             id: 2,
      //             title: 'Second post',
      //             previewText: 'This is my second post',
      //             thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
      //           },
      //           {
      //             id: 3,
      //             title: 'Third post',
      //             previewText: 'This is my third post',
      //             thumbnail: 'https://i1.wp.com/blog.codacy.com/wp-content/uploads/2018/10/20181002_WhyCodingStandardsMatter.jpg?fit=750%2C400&ssl=1',
      //           },
      //         ])
      //       resolve();
      //
      //     }, 1500);
      //   })
      // },
      getPosts({commit}, posts) {
        commit('SET_POSTS', posts)
      }
    },
  })
}

export default createStore