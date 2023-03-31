import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/list",
    name: "list",
    component: () => import("@/views/List.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/Cart.vue"),
  },
  {
    path: "/my",
    name: "mine",
    component: () => import("@/views/Mine.vue"),
  },
  {
    path: "/search",
    name: "search",
    children: [
      {
        path: "/",
        name: "search-section",
        component: () => import("@/views/search/search-section.vue"),
      },
      {
        path: "/searchlist",
        name: "searchlist",
        component: () => import("@/views/search/search-list.vue"),
      },
    ],
    component: () => import("@/views/Search.vue"),
  },
  {
    path: "/detail",
    name: "detail",
    meta: {
      keepAlive: true
    },
    component: () => import("@/views/Detail.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue"),
  },
  {
    path: "/userLogin",
    name: "userLogin",
    component: () => import("@/views/Login/UserLogin.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/Login/Register.vue"),
  },
  {
    path: "/findpwd",
    name: "findpwd",
    component: () => import("@/views/Login/FindPwd.vue"),
  },
  {
    path: "/adress",
    name: "adress",
    children: [
      {
        path:'/',
        name: 'index',
        component: () => import("@/views/Adress/Adress-index.vue"),
      },
      {
        path: '/add',
        name: 'add',
        component: () => import("@/views/Adress/Add-Adress.vue")
      },
      {
        path: '/edit',
        name: 'edit',
        component: () => import("@/views/Adress/Edit-Adress.vue")
      }
  ],
    component: () => import("@/views/Adress.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
