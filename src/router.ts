import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "./views/Login.vue";

import Dashboard from "./views/Dashboard/Dashboard.vue";
import ProductDashboard from "./views/Dashboard/ProductDashboard.vue";

import OrderPage from "./views/Order/OrderPage.vue";

import ProductPage from "./views/Product/ProductPage.vue";

import ReviewPage from "./views/Review/ReviewPage.vue";

import UserPage from "./views/User/UserPage.vue";

import Warehouse from "./views/Warehouse/Warehouse.vue";

import BrandPage from "./views/Others/BrandPage.vue";
import CategoryPage from "./views/Others/CategoryPage.vue";
import ColorPage from "./views/Others/ColorPage.vue";
import LogPage from "./views/History/LogPage.vue";

import Blank from "./views/Blank.vue";
import NotFound from "./views/NotFound.vue";
import Forms from "./views/Forms.vue";
import Tables from "./views/Tables.vue";
import UIElements from "./views/UIElements.vue";
import Modal from "./views/Modal.vue";
import Card from "./views/Card.vue";

import test from "./components/test.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: Login,
    meta: { layout: "empty" },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/productdashboard",
    name: "Product Dashboard",
    component: ProductDashboard,
  },

  {
    path: "/order",
    name: "Order",
    component: OrderPage,
  },
  {
    path: "/order/:id",
    name: "order.detail",
    component: () => import("./views/Order/OrderDetail.vue"),
    props: true,
  },

  {
    path: "/product",
    name: "Product",
    component: ProductPage,
  },
  {
    path: "/product/add",
    name: "Add product",
    component: () => import("./views/Product/AddProductPage.vue"),
    props: true,
  },
  {
    path: "/product/:id",
    name: "product.edit",
    component: () => import("./views/Product/EditProductPage.vue"),
    props: true,
  },

  {
    path: "/review",
    name: "Review",
    component: ReviewPage,
  },

  {
    path: "/user",
    name: "User",
    component: UserPage,
  },

  {
    path: "/warehouse",
    name: "Warehouse",
    component: Warehouse,
  },

  {
    path: "/brand",
    name: "Brand",
    component: BrandPage,
  },
  {
    path: "/category",
    name: "Category",
    component: CategoryPage,
  },
  {
    path: "/color",
    name: "Color",
    component: ColorPage,
  },
  {
    path: "/log",
    name: "Log",
    component: LogPage,
  },

  {
    path: "/blank",
    name: "Blank",
    component: test,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;
