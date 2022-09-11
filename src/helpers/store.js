import { reactive } from "vue";

export const userDataStore = reactive({
  userId: null,
  username: null,
  token: null,
  authenticated() {
    return this.username != null;
  },
  setCredentials(username, userId) {
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    this.username = username;
    this.userId = userId;
  },
  getSavedCredentials() {
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("userId");
  },
});
