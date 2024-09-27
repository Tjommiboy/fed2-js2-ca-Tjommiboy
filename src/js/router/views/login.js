import { onLogin } from "../../ui/auth/login";
console.log("login.js is loaded");

const form = document.querySelector("#loginForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submit event detected");
    onLogin(event);
  });
} else {
  console.error("Form not found");
}
