<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="hideNewAssetModal">&times;</span>
      <div class="add-new-form">
        <label for="asset_name">Asset Name</label>
        <input type="text" name="asset_name" v-model="new_asset.asset_name">
        <label for="asset_type">Asset Type</label>
        <select name="asset_type" v-model="new_asset.asset_type">
          <option value="Laptops">Laptops</option>
          <option value="Mobile Phones">Mobile Phones</option>
        </select>
        <label for="asset_description">Asset Description</label>
        <input type="text" name="asset_description" v-model="new_asset.asset_description">
        <label for="asset_serial_number">Asset Serial Number</label>
        <input type="text" name="asset_serial_number" v-model="new_asset.asset_serial_number">
      </div>
      <div class="action-button">Save and Close</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssetAddNew",
  data: () => {
    return {
      new_asset: {
        asset_name: "",
        asset_type: "",
        asset_description: "",
        asset_serial_number: ""
      }
    };
  },
  methods: {
    hideNewAssetModal() {
      this.$emit("hideNewAssetModal");
    },
    async saveAndClose() {
      let new_asset = await Object.assign({}, this.new_asset);

      this.$store.dispatch("createNewAsset", {
        new_asset: new_asset
      });
      this.hideAddNew();
    }
  }
};
</script>

<style scoped>
.add-new {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.action-button {
  padding: 5px;
  background-color: gray;
  color: black;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.action-button:hover {
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
.add-new-form {
  display: flex;
  flex-flow: column;
}
.modal {
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
