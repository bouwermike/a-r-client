import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import axios from 'axios'
import store from './store.js'
import jwt_decode from 'jwt-decode'
import {
  URLS
} from './URLS'

Vue.use(Router)



const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        guest: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import( /* webpackChunkName: "profile" */ './views/Profile.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import( /* webpackChunkName: "login" */ './views/Login.vue'),
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import( /* webpackChunkName: "register" */ './views/Register.vue'),
      meta: {
        guest: true
      }
    }
  ]
})


router.beforeEach(async (to, from, next) => {
  //Check if the route is requires auth
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let jwt = window.localStorage.getItem('jwt')
    let current_user = store.state.current_user

    //Check if a jwt is present. If not, redirect to login.
    if (!jwt) {
      store.commit('removeCurrentUser')
      next({
        path: '/login',
        params: {
          nextUrl: to.fullPath
        }
      })
    } 
    //If a jwt is present, but there is no current_user in state, verify the jwt
    else if (jwt && !current_user) {
      //Clear the current_user state for certainty
      store.commit('removeCurrentUser')
      let verified = await axios.get(URLS.verifyJWT)

      //If the jwt is verified, reconcile the current_user with the user stored in the jwt
      if (verified) {
        let decoded = await jwt_decode(jwt)
        store.commit('setCurrentUser', {
          user: decoded
        })
      } 
      //If the jwt has expired or is malformed, redirect to login
      else {
        next({
          path: '/login',
          params: {
            nextUrl: to.fullPath
          }
        })
      }
    } 
    //If a jwt is present, and a current_user exists in state, verify the jwt
    else if (jwt && current_user) {
      let verified = await axios.get(URLS.verifyJWT)

      //If the jwt is verified, check that the jwt belongs to the current_user in state
      if (verified) {
        let decoded = await jwt_decode(jwt)
        if (decoded.user_id == current_user.user_id) {
          next()
        } 
        //If there is a mismatch between jwt and user, remove the user and redirect to login
        else {
          store.commit('removeCurrentUser')
          next({
            path: '/login',
            params: {
              nextUrl: to.fullPath
            }
          })
        }
      } 
      //If the jwt is not verified, redirect to login
      else {
        store.commit('removeCurrentUser')
        next({
          path: '/login',
          params: {
            nextUrl: to.fullPath
          }
        })
      }
      //If it ALLLLLLLL checks out, then call next()
      next()
    }
  }
  //If no auth is required, call next() 
  else {
    next()
  }
})


export default router