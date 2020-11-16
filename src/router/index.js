import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Detail from "../components/Detail";

Vue.use(VueRouter);

export default function createRouter() {
  return new VueRouter({
    mode: "history",
    routes: [
      {path: "/", component: Home},
      {path: "/detail", component: Detail}
    ]
  })
}

