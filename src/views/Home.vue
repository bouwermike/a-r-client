<template>
  <div>
    <h1>Hi!</h1>
    <button @click="user()"> User!</button>
  </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    user() {
      this.$store.dispatch('fetchUsers', {
        userID: 0
      })
    }
  }
}
</script>
