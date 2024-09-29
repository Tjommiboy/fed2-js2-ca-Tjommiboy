import { authGuard } from "../../utilities/authGuard";
import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

authGuard();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");
console.log("Extracted postId:", postId);
if (postId && postId !== "null" && postId !== "undefined") {
  console.log("Fetching post for postId:", postId);
  fetchSinglePost(postId); // Fetch post with valid postId
} else {
  console.error("No valid post ID found in URL");
}

async function fetchSinglePost(postId) {
  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post details");
    }

    const post = await response.json();
    populateForm(post);
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}

function populateForm(post) {
  if (post && post.data) {
    const { title, body, tags, media } = post.data;
    document.getElementById("postTitle").value = title || "";
    document.getElementById("postBody").value = body || "";
    document.getElementById("postTags").value = tags ? tags.join(", ") : "";
    document.getElementById("media-url").value = media?.url || "";
  } else {
    console.error("Invalid post data:", post);
  }
}

// Handle form submission
document.getElementById("editPostForm").onsubmit = async (event) => {
  event.preventDefault();

  const updatedPost = {
    title: document.getElementById("postTitle").value,
    body: document.getElementById("postBody").value,
    tags: document
      .getElementById("postTags")
      .value.split(",")
      .map((tag) => tag.trim()),
    media: { url: document.getElementById("media-url").value },
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: "PUT",
      headers: headers(true),
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const result = await response.json();
    console.log("Post updated successfully:", result);
    window.location.href = "/profile/";
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
