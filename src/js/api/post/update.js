import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
console.log("Extracted postId:", postId);
if (postId && postId !== "null" && postId !== "undefined") {
  console.log("Fetching post for postId:", postId);
  fetchSinglePost(postId); // Fetch post with valid postId
} else {
  console.error("No valid post ID found in URL");
}

export async function updatePost(id, { title, body, tags, media }) {}
