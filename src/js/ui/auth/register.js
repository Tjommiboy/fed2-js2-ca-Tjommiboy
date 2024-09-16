import { registerUser } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const formData = {
    username: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  registerUser(formData)
    .then((response) => {
      console.log("Registration successful", response);
    })
    .catch((error) => {
      console.error("Registration failed", error);
    });
}
