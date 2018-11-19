<template>
 <div class="asset-container">
   <div class="asset-card" v-for="asset in this.$store.state.userAssets" :key="asset.asset_id">
     <div class="left-box">
      <b>{{asset.asset_name}}</b>
      <p>{{asset.asset_type}}</p>
      <p>{{asset.asset_description}}</p>
      <p>Serial Number: {{asset.asset_serial_number}}</p>
      <p>Status: {{asset.user_asset_state}}</p>
      <p>Date Added: {{asset.created}}</p>
    </div>
    <div class="right-box">
      <img :src="asset.asset_image_url" alt="user image" width=200 height="200">
    </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "AssetCard"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .asset-card{
    background-color: cadetblue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0.5px solid black;
    margin-top: 5px;
  }
  .left-box {
  margin: 10px;
}
.right-box {
  margin: 10px;
}
.asset-container {
  padding: 5px;
}
img {
  max-width: 100%;
  height: auto;
}
</style>
