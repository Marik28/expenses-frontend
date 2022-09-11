import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: {
      name: "expenses",
    },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginPage.vue"),
  },
  {
    path: "/expenses",
    name: "expenses",
    component: () => import("../views/ExpensesPage.vue"),
  },
  {
    path: "/statistics",
    name: "stats",
    component: () => import("../views/StatsDashboard.vue"),
  },
  {
    path: "/debts",
    name: "debts",
    component: () => import("../views/DebtsPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
