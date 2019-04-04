<template>
  <div class="main-container">
    <div class="form">  
      <p>Sign in</p> 
      <label for="email">Email</label>
      <input type="text" name="email" v-model="credentials.email">
      <label for="password">Password</label>
      <input type="password" name="password" v-model="credentials.password">
      <button @click="signIn">Go!</button>
      <p style="color:red" v-show="err_message">{{err_message}}</p>
    </div>
  </div>
</template>


<script>
export default {
  name: "login",
  data: () => {
    return {
      credentials: {
        email: "",
        password: ""
      },
      err_message: null
    };
  },
  methods: {
    signIn() {
      if (
        this.credentials.email.length > 0 &&
        this.credentials.password.length > 0
      ) {
        this.$store
          .dispatch("signIn", {
            credentials: this.credentials
          })
          .then(result => {
            if (!result.data.auth) {
              this.err_message = result.data.msg;
            } else {
              this.$router.push("/profile");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  margin: 20px;
}
.form {
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>

