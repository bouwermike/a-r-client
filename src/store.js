import Vue from 'vue'
import Vuex from 'vuex'
import URLS from './URLS.js'
import {
  format
} from 'date-fns'
import _ from 'lodash'
import axios from 'axios'
import router from './router'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_user: null,
    user_auth: {
      authenticated: false
    },
    userAssets: []
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.current_user = payload.user
    },
    removeCurrentUser(state) {
      state.current_user = null
    },
    setUserAssets(state, payload) {
      state.userAssets = payload.assets
    },
    removeUserAssets(state) {
      state.userAssets = []
    },
    pushNewAsset(state, payload) {
      state.userAssets.push(payload.new_asset)
    }
  },
  actions: {
    //Fetch all assets from server for a given user_id
    async fetchAssetsFromServer(context) {
      try {
        let result = await axios.get(URLS.URLS.assets, {
          params: {
            user_id: this.state.current_user.user_id
          },
          headers: {
            Authorization: window.localStorage.getItem('jwt')
          }
        })
        context.commit('setUserAssets', {
          assets: result.data.data
        })
      } catch (error) {
        console.log('result', error)
      }
    },
    //Create a new asset for a give user_id
    async createNewAsset(context, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let result = await axios.post(URLS.URLS.assets, {
            new_asset: payload.new_asset,
            user_id: this.state.current_user.user_id
          }, {
            headers: {
              Authorization: window.localStorage.getItem('jwt')
            }
          })

          if (result.status === 200) {
            context.commit('pushNewAsset', {
              new_asset: result.data.new_asset
            })
            resolve("Asset created!")
          } else {
            reject("something went wrong")
          }
        } catch (error) {
          reject(error)
        }
      })

    },
    //Update an existing asset by its ID
    async updateAsset(context, payload) {
      console.log('store', payload.updated_asset);
      let result = await axios.put(URLS.URLS.assets, {
        updated_asset: payload.updated_asset
      }, {
        headers: {
          Authorization: window.localStorage.getItem('jwt')
        }
      })

      console.log('update', result.data);
      context.dispatch('fetchAssestsFromServer')

    },
    //Create a new user
    async createNewUser(context, payload) {
      let result = await axios.post(URLS.URLS.register, {
        token: window.localStorage.getItem('jwt'),
        new_user: payload.new_user
      })

      console.log('createNewUser', result);

      if (result.status === 200 && result.data.user) {
        await context.commit('setCurrentUser', {
          user: result.data.user
        })
        await window.localStorage.setItem('jwt', result.data.token)
        router.push('/profile')
      } else {
        console.log("Error creating the user");

      }
    },
    //Sign a user in with email password combo
    async signIn(context, payload) {
      console.log(payload);

      return new Promise(async (resolve, reject) => {
        try {
          let result = await axios.post(URLS.URLS.signin, {
            credentials: payload.credentials
          })

          if (result.data.auth) {
            await context.commit('setCurrentUser', {
              user: result.data.user
            })
            await window.localStorage.setItem('jwt', result.data.token)
          }
          resolve(result)

        } catch (error) {
          reject(error)
        }
      })
    },
    //Log a user out
    async logOut(context, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          window.localStorage.removeItem('jwt')
          await context.commit('removeCurrentUser')
          await context.commit('removeUserAssets')
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
  }
})