<template>
  <navbar />
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Navbar from "@/components/NavbarItem.vue";
import { userDataStore } from "./helpers/store";
export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return { userDataStore };
  },
  created() {
    this.userDataStore.getSavedCredentials();
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
</style>
