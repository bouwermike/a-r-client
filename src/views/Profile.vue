<template>
  <div class="box">
    <UserProfile></UserProfile>
    <UserAssetList></UserAssetList>

  </div>
</template>


<script>
import UserProfile from "@/components/UserProfile.vue";
import UserAssetList from "@/components/UserAssetList.vue";

export default {
  name: "profile",
  components: {
    UserProfile,
    UserAssetList
  }
};
</script>

<style scoped>
body {
  background-color: cadetblue;
}
</style>

