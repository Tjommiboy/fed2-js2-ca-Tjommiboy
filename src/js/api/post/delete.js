import { API_SOCIAL_POSTS } from "../constants";
import { headers } from "../headers";
import { loadAndDisplayUserPosts } from "../profile/profileUserPosts";

export async function deletePost(id) {
  const confirmDelete = confirm("Are you sure you want to delete this post?");
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${id}`, {
      method: "DELETE",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to delete post");
    }

    loadAndDisplayUserPosts();
  } catch (error) {
    console.error("Error deleting post:", error);
  }
}
