import { API_SOCIAL_POSTS } from "../../api/constants";
import { headers } from "../../api/headers";

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

    displaySinglePost(post);
  } catch (error) {
    console.error("Error fetching post details:", error);
  }
}

function displaySinglePost(post) {
  const postContainer = document.getElementById("postContainer");

  const tags = Array.isArray(post.tags) ? post.tags.join(", ") : "No tags";

  postContainer.innerHTML = `
        <h2>${post.data.title}</h2>
        <p>${post.data.body}</p>
        <p>Tags: ${tags}</p>
        ${
          post.data.media?.url
            ? `<img class="specificImg" src="${post.data.media.url}" alt="${
                post.data.media.alt || "Post media"
              }">`
            : ""
        }
        `;

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = (event) => {
    event.preventDefault();
    window.location.href = `/post/edit/?postId=${postId}`;
  };

  postContainer.appendChild(editButton);
}
