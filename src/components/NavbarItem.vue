<template>
  <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="{ name: 'home' }"
        >Расходы</router-link
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarSupportedContent" class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li
            v-for="(view, index) in [
              { name: 'expenses', text: 'Expenses' },
              { name: 'stats', text: 'Statistics' },
              { name: 'debts', text: 'Debts' },
            ]"
            :key="index"
            class="nav-item"
          >
            <router-link
              class="nav-link"
              :class="{
                active: isCurrentRoute(view.name),
              }"
              :to="{ name: view.name }"
              >{{ view.text }}</router-link
            >
          </li>
        </ul>
        <template v-if="!userDataStore.authenticated()">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link active" :to="{ name: 'login' }"
                >Login</router-link
              >
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ userDataStore.username }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" href="#">Какие-то настройки</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Выйти</a></li>
            </ul>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { userDataStore } from "@/helpers/store";
export default {
  name: "NavbarItem",
  data() {
    return {
      userDataStore,
    };
  },
  methods: {
    isCurrentRoute(name) {
      return this.$route.name == name;
    },
  },
};
</script>

<style scoped>
.dropdown-menu {
  left: -90px;
}
</style>
