import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { pinia } from "./store";

import './style/index.css'
import 'uno.css'
// 通用字体
import "vfonts/Lato.css";
// 等宽字体
import "vfonts/FiraCode.css";

const setupApp = () => {
  const app = createApp(App);

  app.use(pinia);

  app.use(router);

  app.mount("#app");
};

setupApp();
