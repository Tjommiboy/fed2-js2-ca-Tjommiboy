import { authGuard } from "../../utilities/authGuard";
import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

authGuard();

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

if (postId) {
  fetchSinglePost(postId);
} else {
  console.error("No post ID found in URL");
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
    document.getElementById("postTitle").value = title || ""; // Default to empty if not defined
    document.getElementById("postBody").value = body || "";
    document.getElementById("postTags").value = tags ? tags.join(", ") : "";
    document.getElementById("media-url").value = media?.url || ""; // Default to empty if not defined
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
      .map((tag) => tag.trim()), // Split and trim tags
    media: { url: document.getElementById("media-url").value }, // Assuming media is an object
  };

  try {
    const response = await fetch(`${API_SOCIAL_POSTS}/${postId}`, {
      method: "PUT", // Use PUT to update the post
      headers: {
        ...headers(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
      throw new Error("Failed to update post");
    }

    const result = await response.json();
    console.log("Post updated successfully:", result);
    // Optionally redirect or show a success message
    // For example: window.location.href = '/path-to-redirect-after-success';
  } catch (error) {
    console.error("Error updating post:", error);
  }
};
