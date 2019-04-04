<template>
 <div class="asset-container">
   <div>
     <div class="asset-card" v-show="!edit_active">
        <div class="left-box" >
          <b>{{asset.asset_name}}</b>
          <p>{{asset.asset_type}}</p>
          <p>{{asset.asset_description}}</p>
          <p>Serial Number: {{asset.asset_serial_number}}</p>
          <p :style="assetStatus.style">{{assetStatus.status}}</p>
          <p>Date Added: {{asset.created}}</p>
      </div>
      <div class="right-box">
        <div class="controls">
          <button @click="showEditActive">Edit</button>
        </div>
        <img :src="asset.asset_image_url" alt="user image" width=200 height="200">
      </div>
     </div>
     <div class="asset-card-edit" v-show="edit_active">
        <div class="left-box">
          <input type="text" :value="asset.asset_name"   @input="updateAsset" id="asset_name">
          <p>Make this an elastic search call (categories)</p>
          <input type="text" :value="asset.asset_description"  @input="updateAsset" id="asset_description">
          <input type="text" :value="asset.asset_serial_number" @input="updateAsset" id="asset_serial_number">
          <select name="" id="user_asset_state" @input="updateAsset">
            <option value="0">Owned</option>
            <option value="1">Sold</option>
            <option value="2">Stolen!</option>
          </select>
          <p>Date Added: {{asset.created}}</p>
          <div class="controls">
            <button @click="saveAndClose"> Save </button>
            <button @click="hideEditActive"> Cancel </button>
            <button> Delete </button>
          </div>
      </div>
      <div class="right-box">
        <img :src="asset.asset_image_url" alt="user image" width=200 height="200">
        <input 
          type="file" 
          name="asset_image" 
          @change="newFileSelected"
          ref="fileInput"
          style="display: none;"
          >
        <button @click="$refs.fileInput.click()">Change Image</button>
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
      updated_asset: {
        asset_id: "",
        asset_name: "",
        asset_type: "",
        asset_description: "",
        asset_serial_number: "",
        user_asset_state: "",
        asset_image: ""
      }
    };
  },
  props: ["asset"],
  methods: {
    updateAsset() {
        this.updated_asset.asset_name = document.getElementById('asset_name').value
        this.updated_asset.asset_description = document.getElementById('asset_description').value
        this.updated_asset.asset_serial_number = document.getElementById('asset_serial_number').value
        this.updated_asset.user_asset_state = document.getElementById('user_asset_state').value
    },
    showEditActive() {
      this.edit_active = true;
      console.log("show");
    },
    hideEditActive() {
      this.edit_active = false;
    }, 
    async newFileSelected(event) {
      let reader = new FileReader();
      reader.addEventListener("loadend", async () => {
        let image_buffer = await Buffer.from(reader.result).toString("base64");
        this.updated_asset.asset_image = image_buffer;
      });
      reader.readAsArrayBuffer(event.target.files[0]);
    },
    saveAndClose() {
      this.$store.dispatch('updateAsset', {
        updated_asset: this.updated_asset
      });
      this.hideEditActive()
    }
  },
  computed: {
    setDataFromProps() {
      this.updated_asset.asset_id = this.asset.asset_id
      this.updated_asset.asset_name = this.asset.asset_name
      this.updated_asset.asset_type = this.asset.asset_type
      this.updated_asset.asset_description = this.asset.asset_description
      this.updated_asset.asset_serial_number = this.asset.asset_serial_number
      this.updated_asset.user_asset_state = this.asset.user_asset_state
    },
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
  flex-direction: column;
}
.right-box {
  margin: 10px;
  display: flex;
  flex-direction: column;
}
.asset-container {
  padding: 5px;
}
img {
  max-width: 100%;
  height: auto;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>
