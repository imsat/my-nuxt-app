import Vuex from 'vuex'
import Cookie from 'js-cookie'

const createStore = () => {
  return new Vuex.Store({
    state: {
      loadedPosts: [],
      token: null,
    },
    getters: {
      loadedPosts(state) {
        return state.loadedPosts
      },
      isAuthenticated(state) {
        return state.token != null
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
      },
      SET_TOKEN(state, token) {
        state.token = token;
      },
      CLEAR_TOKEN(state) {
        state.token = null;
      }
    },
    actions: {
      nuxtServerInit(vuexContext, context) {
        return context.app.$axios
          .$get('/posts.json')
          .then(data => {
            const postArray = []
            for (const key in data) {
              // postArray.push(res.data[key])
              postArray.push({...data[key], id: key})
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
        return this.$axios.$post(process.env.baseUrl + '/posts.json?auth=' + vuexContext.state.token, createdPost)
          .then(data => {
            vuexContext.commit('ADD_POST', {...createdPost, id: data.name});
            this.$router.push('/admin')
          })
          .catch(err => {
            console.log(err)
          })
      },
      editedPost(vuexContext, editedPost) {
        return this.$axios.$put(process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost)
          .then(data => {
            vuexContext.commit('EDIT_POST', editedPost)
          })
          // .catch(e => context.error(e))
          .catch(e => console.log(e))
      },
      authenticateUser(vuexContext, authData) {
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.fbAPIKey
        if (!authData.isLogin) {
          authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.fbAPIKey
        }
        return this.$axios.$post(authUrl, {
          email: authData.email,
          password: authData.password,
          returnSecureToken: true
        }).then(data => {
          console.log(data);
          vuexContext.commit('SET_TOKEN', data.idToken);
          localStorage.setItem('token', data.idToken);
          localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000);

          Cookie.set('jwt', data.idToken)
          Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(data.expiresIn) * 1000);

          return this.$axios.$post('http://localhost:3000/api/track-data', {data: 'Authenticated'})

        }).catch(err => {
          console.log(err)
        })
      },
      initAuth(vuexContext, req) {
        let token;
        let expirationDate;
        if (req) {
          if (!req.headers.cookie) {
            return;
          }
          const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return;
          }
          token = jwtCookie.split('=')[1];
          expirationDate = req.headers.cookie.split(';').find(c => c.trim().startsWith('expirationDate=')).split('=')[1];

        } else {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
        }

        // console.log(new Date().getTime(), +expirationDate)
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('No token or invalid token');
          vuexContext.dispatch('logout');
          return;
        }
        vuexContext.commit('SET_TOKEN', token)
      },
      logout(vuexContext) {
        vuexContext.commit('CLEAR_TOKEN');
        Cookie.remove('jwt');
        Cookie.remove('expirationDate');
        if(process.client){
          localStorage.removeItem(('token'))
          localStorage.removeItem(('tokenExpiration'))
        }
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
