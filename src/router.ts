import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Login from "./views/Login.vue";
import Dashboard from "./views/Dashboard.vue";
import OrderPage from "./views/OrderPage.vue";
import LaptopPage from "./views/Product/LaptopPage.vue";
import SmartPhonePage from "./views/SmartPhonePage.vue";
import UserPage from "./views/UserPage.vue";
import BrandPage from "./views/Others/BrandPage.vue";
import CategoryPage from "./views/Others/CategoryPage.vue";
import ColorPage from "./views/Others/ColorPage.vue";
import Blank from "./views/Blank.vue";
import NotFound from "./views/NotFound.vue";
import Forms from "./views/Forms.vue";
import Tables from "./views/Tables.vue";
import UIElements from "./views/UIElements.vue";
import Modal from "./views/Modal.vue";
import Card from "./views/Card.vue";


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
    path: "/order",
    name: "Order",
    component: OrderPage,
  },
  {
    path: "/laptop",
    name: "Laptop",
    component: LaptopPage,
  },
  {
    path: "/phone",
    name: "Smart Phone",
    component: SmartPhonePage,
  },
  {
    path: "/product/add",
    name: "Add product",
    component: () => import("./views/Product/AddProductPage.vue"),
    props: true
  },
  {
    path: "/product/:id",
    name: "product.edit",
    component: () => import("./views/Product/EditProductPage.vue"),
    props: true
  },
  {
    path: "/user",
    name: "User",
    component: UserPage,
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
    path: "/blank",
    name: "Blank",
    component: Forms,
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
