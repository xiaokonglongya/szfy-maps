import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router";
import BaseLayout from "@/layout/BaseLayout.vue";
import { isUserLogin } from "@/utils/auth";
export const routers: RouteRecordRaw[] = [
  {
    path: "/",
    component: BaseLayout,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "home",
        component: () => import("@/views/index/index.vue"),
      },
    ],
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/views/login/index.vue"),
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routers,
});

// router.beforeEach((from, to, next) => {
//   let isLogin = isUserLogin();
//   if (!isLogin && from.path !== "/login") {
//     next({ name: "Login" });
//   } else {
//     next();
//   }
// });

export default router;
