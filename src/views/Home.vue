<template>
  <div class="main-container">
    <div class="left">
        <h1>Search For An Asset</h1>
        <p>Category</p>
        <select name="" id="" v-bind="current_category">
          <option value="mobile_devices">Mobile Devices</option>
          <option value="laptops">Laptops</option>
        </select>
        <p>Serial number</p>
        <input type="text" placeholder="search" v-model="query">
        <div class="search-result-container" v-if="results.length > 0">
          <div v-for="result in this.results" :key="result._source.asset_id">
            <div class="search-result-item" @click="selectResult(result._source)">
              <div class="search-result-item-left">
                  <p>{{result._source.asset_name}} </p>
                  <p>{{result._source.asset_serial_number}}</p>
              </div>
              <div class="search-result-item-left">
                  <p>{{result._source.asset_description}}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="result-display" v-show="selected_result">
          <AssetCard :asset="selected_result"></AssetCard>
        </div>
    </div>
    <div class="right">
      <div v-if="this.$store.state.current_user">
          <p>Hey {{this.$store.state.current_user.first_name}}</p>
          <p>You have {{this.$store.state.userAssets.length}} assets registered with us.</p>
          <p>Need to <router-link to='/profile'>add more?</router-link></p>
      </div>
      <div v-else>
          <h1>Register Your Assets</h1>
          <p>Protect your assets against petty theft by claiming it's serial number</p>
          <button @click="toRegister">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script>
import AssetCard from '../components/AssetCard.vue'
import LeftRightView from '../components/LeftRightView.vue'
import axios from "axios";
import URLS from "@/URLS.js";

export default {
  name: "home",
  data: () => {
    return {
      current_category: null,
      results: [],
      selected_result: "",
      query: ""
    };
  },
  components: {
    AssetCard,
    LeftRightView
  },
  methods: {
    toRegister() {
      this.$router.push("register");
    },
    search() {
      axios
        .get(URLS.URLS.search + "?q=" + this.query)
        .then(response => {
          this.results = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectResult(result) {
      this.selected_result = result;
      this.results = [];
    }
  },
  computed: {
    assetStatus() {
      switch (parseInt(this.selected_result.user_asset_state)) {
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
  },
  watch: {
    query: function() {
      if (this.query.length > 3) {
        this.search();
      } else if (this.query.length < 3) {
        this.results = [];
      }
    }
  }
};
</script>


<style scoped>
.main-container {
  display: flex;
  justify-content: space-evenly;
  margin: 20px;
}
.left {
  min-width: 50%;
  padding: 10px;
  background-color: lightgray;
  display: flex;
  flex-direction: column;
}
.right {
  padding: 10px;
  background-color: beige;
}
.search-form {
  padding: 5px;
}
.search-result-container {
  background-color: beige;
  display: flex;
  flex-direction: column;
  padding: 5px;
  text-align: center;
}
.search-result-item {
  display: flex;
  justify-content: space-between;
}
.search-result-item:hover {
  background-color: gray;
  cursor: pointer;
}
.result-display {
  margin: 10px;
  display: flex;
  justify-content: space-between;
}
</style>

