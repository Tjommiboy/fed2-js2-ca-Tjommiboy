import { authGuard } from "../../utilities/authGuard";

document.getElementById("logout-btn").addEventListener("click", function () {
  console.log("Logout button clicked");
});

authGuard();
