<template>
  <div class="asset-list">
    <div class="header">
      <h1>Asset List</h1>
      <div v-if="!add_new_active">
        <div class="action-button" @click="showAddNew">Add New Asset</div>
      </div>
    </div>
    <div class="add-new" v-show="add_new_active">
      <div class="modal">
        <div class="modal-content">
          <span class="close" @click="hideAddNew">&times;</span>
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
      </div>
    </div>
    <div class="list">
      <div v-if="this.$store.state.userAssets.length === 0">
        <p>Loading Assets...</p>
      </div>
      <div v-else>
        <div v-for="asset in this.$store.state.userAssets" :key="asset.asset_id">
          <AssetCard :asset="asset"></AssetCard>
        </div>
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
    hideAddNew() {
      this.add_new_active = false;
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
      this.hideAddNew();
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
