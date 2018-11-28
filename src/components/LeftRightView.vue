<template>
  <div class="main-box">
    <div class="left-box">
      <slot name="leftBox"></slot>
    </div>
    <div class="right-box">
      <slot name="rightBox"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LeftRightView",
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-box {
  display: flex;
  justify-content: space-between
}
.left-box {
  margin: 10px;
}
.right-box {
  margin: 10px;
}
</style>
