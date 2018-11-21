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
        <div class="search-result" v-if="results.length > 0">
          <ul v-for="asset in this.results" :key="asset._source.asset_id">
            <li @click="selectResult">{{asset._source.asset_serial_number}}</li>
          </ul>
        </div>
        
        <div style="margin: 10px" v-show="selected_result">
          <p>Asset Id: </p>
          <p>Asset state: </p>
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
import axios from "axios";
import URLS from "@/URLS.js";

export default {
  name: "home",
  data: () => {
    return {
      current_category: null,
      results: [],
      selected_result: null,
      query: ""
    };
  },
  methods: {
    toRegister() {
      this.$router.push("register");
    },
    search() {
      axios
        .get(URLS.URLS.search + "?q=" + this.query)
        .then(response => {
          console.log(response);
          this.results = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    selectResult() {
      
    }
  },
  watch: {
    query: function() {
      if (this.query.length > 3) {
        this.search();
      } else if(this.query.length < 3) {
        this.results = []
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
  padding: 10px;
  background-color: cornflowerblue;
  display: flex;
  flex-direction: column;
}
.right {
  padding: 10px;
  background-color: burlywood;
}
.search-form {
  padding: 5px;
}
.search-result {
  background-color: beige;
}
.search-result ul {
  list-style: none;
}
.search-result li:hover {
  background-color: gray;
}
</style>

