import { loginUser } from "../../api/auth/login";

export async function onLogin(event) {
  event.preventDefault();
  const formData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  try {
    const response = await loginUser(formData);
    console.log("Login successful", response);
    window.location.href = "/";
  } catch (error) {
    console.error("Login failed", error);
  }
}
