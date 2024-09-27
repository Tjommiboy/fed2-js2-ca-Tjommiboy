import { registerUser } from "../../api/auth/register";

export async function onRegister(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };
  try {
    const response = await registerUser(formData);
    console.log("Registration successful", response);

    const proceed = window.confirm(
      "Registration successful! Would you like to go to the login page?"
    );
    if (proceed) {
      window.location.href = "/auth/login/";
    }
  } catch (error) {
    console.error("Registration failed", error);
  }
}
