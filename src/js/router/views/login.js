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

function toggleAuthButtons() {
  const isAuthenticated = checkIfLoggedIn();
  const loginButton = document.getElementById("loginButton");
  const registerButton = document.getElementById("registerButton");

  if (isAuthenticated) {
    if (loginButton) loginButton.style.display = "none";
    if (registerButton) registerButton.style.display = "none";
  } else {
    if (loginButton) loginButton.style.display = "block";
    if (registerButton) registerButton.style.display = "block";
  }
}

function checkIfLoggedIn() {
  const profile = localStorage.getItem("token");
  console.log("token:", token);
  return token ? true : false;
}
