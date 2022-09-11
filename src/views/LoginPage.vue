<template>
  <div>
    <form>
      <div class="mb-3">
        <div class="mb-3">
          <label for="inputUsername" class="form-label">Username</label>
          <input
            id="inputUsername"
            v-model="username"
            type="text"
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="inputUserId" class="form-label">Telegram ID</label>
        <input
          id="inputUserId"
          v-model="userId"
          type="text"
          class="form-control"
        />
      </div>
      <button type="submit" class="btn btn-primary" @click.prevent="login">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { userDataStore } from "@/helpers/store";
export default {
  name: "LoginPage",
  data() {
    return {
      userDataStore,
      username: "",
      userId: "",
    };
  },
  methods: {
    login() {
      this.userDataStore.setCredentials(this.username, this.userId);
      this.$router.push({ name: "expenses" });
    },
  },
};
</script>
