import routers from "./router/index";
import "normalize.css";
import { createApp } from "vue";
import App from "./App.vue";
import { setupNaive } from "./plugins/naive";
const app = createApp(App);
setupNaive(app).use(routers).mount("#app");
