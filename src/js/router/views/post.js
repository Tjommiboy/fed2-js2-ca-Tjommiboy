import { API_SOCIAL_POSTS } from "../../api/constants";

import { readPost } from "../../api/post/read";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("postId");

if (postId) {
  readPost(postId);
} else {
  console.error("No post ID found in URL");
}

export function displaySinglePost(post) {
  const postContainer = document.getElementById("postContainer");
  postContainer.innerHTML = ""; // Clear any existing content

  // Create title element
  const titleElement = document.createElement("h2");
  titleElement.textContent = post.data.title;

  // Create body element
  const bodyElement = document.createElement("p");
  bodyElement.textContent = post.data.body;

  // Create tags element
  const tagsElement = document.createElement("p");
  const tags = Array.isArray(post.tags) ? post.tags.join(", ") : "No tags";
  tagsElement.textContent = `Tags: ${tags}`;

  // Create media element if it exists
  let mediaElement;
  if (post.data.media?.url) {
    mediaElement = document.createElement("img");
    mediaElement.className = "specificImg";
    mediaElement.src = post.data.media.url;
    mediaElement.alt = post.data.media.alt || "Post media";
  }

  // Create edit button
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.onclick = (event) => {
    event.preventDefault();
    const postId = new URLSearchParams(window.location.search).get("postId");
    window.location.href = `/post/edit/?postId=${postId}`;
  };

  // Append all created elements to the container
  postContainer.appendChild(titleElement);
  postContainer.appendChild(bodyElement);
  postContainer.appendChild(tagsElement);
  if (mediaElement) {
    postContainer.appendChild(mediaElement);
  }
  postContainer.appendChild(editButton);
}
