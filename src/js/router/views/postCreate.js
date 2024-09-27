import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.querySelector("#createPostForm");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submit event detected");
    onCreatePost(event);
  });
} else {
  console.error("Form not found");
}
