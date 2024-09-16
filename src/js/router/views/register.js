import { onRegister } from "../../ui/auth/register";

const form = document.forms.register;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.forms.register;

  if (form) {
    form.addEventListener("submit", (event) => {
      console.log("Form submit event detected");
      onRegister(event);
    });
  } else {
    console.error("Form not found");
  }
});
