import { onCreatePost } from "../../ui/post/create";
import { authGuard } from "../../utilities/authGuard";

authGuard();

const form = document.querySelector("#createPostForm");
if (form) {
  form.addEventListener("submit", async (event) => {
    // Mark the callback async
    event.preventDefault();
    console.log("Form submit event detected");
    try {
      await onCreatePost(event); // Ensure you wait for completion
      console.log("Post creation completed");
    } catch (error) {
      console.error("Error during post creation:", error);
    }
  });
} else {
  console.error("Form not found");
}
