<template>
  <div class="main-container">
    <div class="form">  
      <p>Sign up</p> 
      <label for="first_name">First Name</label>
      <input type="text" name="first_name" v-model="new_user.first_name">
      <label for="last_name">Last Name</label>
      <input type="text" name="last_name" v-model="new_user.last_name">
      <label for="email">Email</label>
      <input type="email" name="email" v-model="new_user.email">
      <!-- <label for="asset_image">Profile Image</label> -->
      <!-- <input 
      type="file" 
      name="asset_image" 
      @change="newFileSelected"
      ref="fileInput"
      style="display: none;"
      >
      <div style="display: flex">
      <button @click="$refs.fileInput.click()">Add Image</button> 
      <p v-show="img_uploaded" style="color:green">{{img_file_name}} succesfully uploaded</p></div> -->
      <div class="password-form">
        <label for="password">Password</label>
      <input type="password" name="password" v-model="new_user.password">
      <label for="conf_password">Confirm Password</label>
      <input type="password" name="conf_password" v-model="conf_password">
      <div v-show="this.new_user.password.length > 0">
        <p style="color: red" v-if="this.new_user.password.length < 6">Password must be at least 6 characters</p>
        <p style="color: red" v-else-if="this.new_user.password != this.conf_password">Passwords do not match</p>
        <p style="color: green" v-else>Password looks good!</p>
      </div>
      <p style="color:red" v-show="show_form_error">Please complete all fields!</p>
      </div>
      <button @click="register">Sign me up!</button>
    </div>
  </div>
</template>


<script>
export default {
  name: "register",
  data: () => {
    return {
      new_user: {
        first_name: "",
        last_name: "",
        email: "",
        password: ""
      },
      conf_password: "",
      show_form_error: false,
    };
  },
  methods: {
    register() {
      if (
        this.new_user.first_name.length > 0 &&
        this.new_user.last_name.length > 0 &&
        this.new_user.email.length > 0 &&
        this.new_user.password.length > 0 &&
        this.new_user.password === this.conf_password
      ) {
        let new_user = Object.assign({}, this.new_user);
        this.$store.dispatch("createNewUser", {
          new_user: new_user
        });
      } else {
        this.show_form_error = true;
      }
    }
  },
  components: {}
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
.password-form {
  margin-top: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  padding: 5px;
}
</style>

