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

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("DOMContentLoaded event fired");
//   console.log("HTML content loaded");

//   // Check if the form is available
//   const form = document.querySelector("#registerForm");
//   console.log(form); // Log the form to check if it is null or not

//   if (form) {
//     console.log("Form found");
//     form.addEventListener("submit", (event) => {
//       event.preventDefault();
//       console.log("Form submit event detected");
//       onRegister(event);
//     });
//   } else {
//     console.error("Form not found");
//   }
// });
