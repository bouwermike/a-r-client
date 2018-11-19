<template>
  <div class="user-profile">
    <div class="left-box">
      <h1>{{this.$store.state.current_user.first_name + ' ' + this.$store.state.current_user.last_name}}</h1>
      <p>Member since {{this.$store.state.current_user.created}}</p>
      <p v-if="this.$store.state.current_user.verified">Verified</p>
      <p v-else>Not verified</p>
      <p>{{this.$store.state.current_user.email}}</p>
    </div>
    <div class="right-box">
      <img :src="this.$store.state.current_user.user_image_url" alt="user image" width=200>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "UserProfile",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user-profile {
  margin: 10px;
  background-color: beige;
  display: flex;
  justify-content: space-between
}
.left-box {
  margin: 10px;
}
.right-box {
  margin: 10px;
}
img {
  max-width: 100%;
  height: auto;
}

</style>
