<template>
  <div class="asset-list">
    <div class="header">
      <h1>Asset List</h1>
      <div v-if="!add_new_active">
        <div class="action-button" @click="showAddNew">Add New Asset</div>
      </div>
    </div>
    <div class="add-new" v-show="add_new_active">
      <AssetAddNew @hideNewAssetModal="hideAddNew"/>
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
import AssetAddNew from "@/components/AssetAddNew";

export default {
  name: "UserAssetList",
  data: () => {
    return {
      add_new_active: false
    };
  },
  components: {
    AssetCard,
    AssetAddNew
  },
  methods: {
    showAddNew() {
      this.add_new_active = true;
    },
    hideAddNew() {
      this.add_new_active = false;
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
</style>
