import Vue from "vue";
import createRouter from "./router/index"
import App from "./App.vue"


export default function createApp() {
  const router = createRouter();
  const app = new Vue({
    router,
    render: h => h(App)
  });
  return {app, router}
}