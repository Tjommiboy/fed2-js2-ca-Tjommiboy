import { onRegister } from "../../ui/auth/register";

console.log("register.js is loaded");

const form = document.querySelector("#registerForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submit event detected");
    onRegister(event);
  });
} else {
  console.error("Form not found");
}
