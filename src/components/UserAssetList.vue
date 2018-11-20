<template>
  <div class="asset-list">
    <div class="header">
      <h1>Asset List</h1>
      <div class="action-button" @click="showAddNew">Add New Asset</div>
    </div>
    <div class="add-new" v-show="add_new_active">
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
        <label for="asset_image">Asset Image</label>
          <input 
          type="file" 
          name="asset_image" 
          @change="newFileSelected"
          ref="fileInput"
          style="display: none;"
          >
          <button @click="$refs.fileInput.click()">Add Image</button>
      </div>
      <div class="action-button" @click="saveAndClose">Save and Close</div>
    </div>
    <div class="list">
      <div v-if="this.$store.state.userAssets.length === 0">
        <p>Loading Assets...</p>
      </div>
      <div v-else>
        <AssetCard></AssetCard>
      </div>
    </div>
  </div>
</template>

<script>
import AssetCard from "@/components/AssetCard";

export default {
  name: "UserAssetList",
  data: () => {
    return {
      add_new_active: false,
      new_asset: {
        asset_name: "",
        asset_type: "",
        asset_description: "",
        asset_serial_number: "",
        asset_image: ""
      }
    };
  },
  components: {
    AssetCard
  },
  methods: {
    showAddNew() {
      this.add_new_active = true;
    },
    async newFileSelected(event) {
      let reader = new FileReader();
      reader.addEventListener("loadend", async () => {
        let image_buffer = await Buffer.from(reader.result).toString("base64");
        this.new_asset.asset_image = image_buffer;
      });
      reader.readAsArrayBuffer(event.target.files[0]);
    },
    async saveAndClose() {
      let new_asset = await Object.assign({}, this.new_asset);

      this.$store.dispatch("createNewAsset", {
        new_asset: new_asset
      });
    }
  },
  mounted() {
    this.$store.dispatch("fetchAssetsFromServer");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.asset-list {
  margin: 10px;
  background-color: chocolate;
}
.header {
  margin: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
</style>
