import Vue from 'vue'
import Vuex from 'vuex'
import {
  Users,
  Assets
} from './mockdata.js'
import {
  URLS
} from './URLS.js'
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
        let result = await axios.get(URLS.assets, {
          params: {
            user_id: this.state.current_user.user_id
          },
          headers: {
            Authorization: window.localStorage.getItem('jwt')
          }
        })

        console.log('fetchAssetsFromServer', result.data);

        context.commit('setUserAssets', {
          assets: result.data.data
        })
      } catch (error) {
        console.log('result', error)
      }
    },
    //Create a new asset for a give user_id
    async createNewAsset(context, payload) {
      let result = await axios.post(URLS.assets, {
        new_asset: payload.new_asset,
        user_id: this.state.current_user.user_id
      }, {
        headers: {
          Authorization: window.localStorage.getItem('jwt')
        }
      })

      console.log('createNewAsset', result.data);

      if (result.status === 200) {
        context.commit('pushNewAsset', {
          new_asset: result.data.new_asset
        })
      } else {
        //HANDLE ERROR
      }
    },
    //Create a new user
    async createNewUser(context, payload) {
      let result = await axios.post(URLS.register, {
        token: window.localStorage.getItem('jwt'),
        new_user: payload.new_user
      })

      console.log('createNewUser', result.data);

      if (result.status === 200 && result.data.user) {
        await context.commit('setCurrentUser', {
          user: result.data.user
        })
        await window.localStorage.setItem('jwt', result.data.token)
        router.push('/profile')
      } else {
        //HANDLE ERROR  
      }
    },
    //Sign a user in with email password combo
    async signIn(context, payload) {
      return new Promise(async (resolve, reject) => {
        try {
          let result = await axios.post(URLS.signin, {
            token: window.localStorage.getItem('jwt'),
            signin_packet: payload.signin_packet
          })

          console.log('signIn', result.data);

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