import { onLogin } from "../../ui/auth/login";
console.log("login.js is loaded");
const form = document.forms.login;

form.addEventListener("submit", onLogin);
