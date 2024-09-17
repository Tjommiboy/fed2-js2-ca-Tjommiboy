import "./css/style.css";

import router from "./js/router/index.js";
console.log("app.js is loaded");
await router(window.location.pathname);
