<template>
  <div class="main-container">
    <div class="left">
        <h1>Search For An Asset</h1>
        <p>Serial Number</p>
        <input type="text">
        <p>Category</p>
        <input type="text">
      
        <button style="margin-top: 10px">Search</button>
    </div>
    <div class="right">
      <div v-if="this.$store.state.current_user">
          <p>Hey {{this.$store.state.current_user.first_name}}</p>
          <p>You have {{this.$store.state.userAssets.length}} assets registered with us.</p>
          <p>Need to <router-link to='/profile'>add more?</router-link></p>
      </div>
      <div v-else>
          <h1>Register Your Assets</h1>
          <p>Protect your assets against petty theft by claiming it's serial number</p>
          <button @click="toRegister">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    toRegister() {
      this.$router.push("register");
    }
  }
};
</script>


<style scoped>
.main-container {
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
}
.left {
  padding: 10px;
  background-color: cornflowerblue;
  display: flex;
  flex-direction: column;
}
.right {
  padding: 10px;
  background-color: burlywood;
}
.search-form {
  padding: 5px;
}
</style>

