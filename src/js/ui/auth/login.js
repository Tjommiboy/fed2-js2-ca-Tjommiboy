import { loginUser } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  loginUser(formData)
    .then((response) => {
      console.log("Login successful", response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("Login failed", error);
    });
}
