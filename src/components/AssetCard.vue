<template>
 <div class="asset-container">
   <div>
     <div class="asset-card" v-show="!edit_active">
        <div class="left-box">
          <b>{{asset.asset_name}}</b>
          <p>{{asset.asset_type}}</p>
          <p>{{asset.asset_description}}</p>
          <p>Serial Number: {{asset.asset_serial_number}}</p>
          <p :style="assetStatus.style">{{assetStatus.status}}</p>
          <p>Date Added: {{asset.created}}</p>
      </div>
      <div class="right-box">
        <img :src="asset.asset_image_url" alt="user image" width=200 height="200">
      </div>
     </div>
     <div class="asset-card-edit" v-show="edit_active">
        <div class="left-box">
          <input type="text" :value="asset.asset_name">
          <p>Make this an elastic search call (categories)</p>
          <input type="text" :value="asset.asset_description">
          <input type="text" :value="asset.asset_serial_number">
          <select name="" id="">
            <option value="0">Owned</option>
            <option value="1">Sold</option>
            <option value="2">Stolen!</option>
          </select>
          <p>Date Added: {{asset.created}}</p>
      </div>
      <div class="right-box">
        <img :src="asset.asset_image_url" alt="user image" width=200 height="200">
        <button> Change image</button>
      </div>
     </div>
   </div>
 </div>
</template>

<script>
export default {
  name: "AssetCard",
  data: () => {
    return {
      edit_active: false,
      x: 1
    };
  },
  props: ["asset"],
  methods: {
    showEditActive() {
      this.edit_active = true;
    },
    hideEditActive() {
      this.edit_active = false;
    }
  },
  computed: {
    assetStatus() {
      switch (parseInt(this.asset.user_asset_state)) {
        case 0:
          return {
            status: "Owned",
            style: "color:green"
          };
          break;
        case 1:
          return {
            status: "Sold / For Sale",
            style: "color:green"
          };
          break;
        case 2:
          return {
            status: "STOLEN",
            style: "color:red"
          };
          break;
        default:
          return {
            status: "No state available",
            style: "color:black"
          };
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.asset-card {
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid black;
  margin-top: 5px;
}
.asset-card-edit {
  background-color: cadetblue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0.5px solid black;
  margin-top: 5px;
}
.left-box {
  margin: 10px;
  display: flex;
  flex-direction: column
}
.right-box {
  margin: 10px;
  display: flex;
  flex-direction: column
}
.asset-container {
  padding: 5px;
}
img {
  max-width: 100%;
  height: auto;
}
.controls{
  display: flex;
  justify-content: space-between;
}
</style>
