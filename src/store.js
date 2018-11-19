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


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_user: null,
    userAssets: null
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.current_user = payload.user
      // state.userAssets = payload.assets
    },
    setUserAssets(state, payload) {
      state.userAssets = payload.assets
    },
    pushNewAsset(state, payload) {
      state.userAssets.push(payload.new_asset)
    }
  },
  actions: {
    fetchUsers(context, payload) {
      let user = Users[payload.userID]
      let assets = _.filter(Assets, {
        'user_id': user.user_id
      })
      user.created = format(user.created, 'DD/MM/YYYY')
      context.commit('setCurrentUser', {
        user: user,
        assets: assets
      })
    },
    async fetchAssetsFromServer(context, payload) {
      let assets = await axios.get(URLS.assets, {
        params: {
          user_id: this.state.current_user.user_id
        }
      })
      context.commit('setUserAssets', {
        assets: assets.data.data
      })
    },
    async createNewAsset(context, payload) {
      let result = await axios.post(URLS.assets, {
        new_asset: payload.new_asset,
        user_id: this.state.current_user.user_id
      })
 
      if(result.status === 200) {
        context.commit('pushNewAsset',{
          new_asset: result.data.new_asset
        })
      }
    }
  }
})