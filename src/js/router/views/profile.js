import { readProfile } from "../../api/profile/read";
import { authGuard } from "../../utilities/authGuard";
import { loadAndDisplayUserPosts } from "../../api/profile/profileUserPosts";

authGuard();

async function loadProfileAndPosts() {
  await readProfile();
  await loadAndDisplayUserPosts();
}

loadProfileAndPosts();
