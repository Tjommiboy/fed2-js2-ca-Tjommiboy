import { readProfile } from "../../api/profile/read";
import { authGuard } from "../../utilities/authGuard";
import { loadAndDisplayUserPosts } from "../../api/profile/profileUserPosts";

authGuard();

async function loadProfileAndPosts() {
  await readProfile(); // Wait for the profile to load first
  await loadAndDisplayUserPosts(); // Then load the posts
}

loadProfileAndPosts();
