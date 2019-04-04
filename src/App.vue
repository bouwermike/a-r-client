<template>
  <div id="app">
    <div id="nav">
      <div>
        <router-link to="/">Asset-Registry</router-link> 
      </div>
      <div v-if="this.$store.state.current_user">
        <router-link to="/profile">Profile</router-link> | 
        <a @click="logOut">Logout</a>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>    
    </div>
    <router-view/>
  </div>
</template>


<script>
  export default {
  name: "app",
  methods: {
    logOut() {
      this.$store.dispatch('logOut').then(() => {
        this.$router.go()
      })
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
#nav {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
}

#nav a {
  color: #2c3e50;
  text-decoration: underline;
}
#nav a:hover {
 cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
