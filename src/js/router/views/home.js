import { authGuard } from "../../utilities/authGuard";
import * as storage from "../../utilities/storage";
import { readPosts } from "../../api/post/read.js";
import { load } from "../../utilities/storage";
import { hideSpinner, showSpinner } from "../../ui/global/spinner.js";

async function displayPosts() {
  showSpinner(); // Start spinner
  try {
    const response = await readPosts(); // Assuming `readPosts` is an API call
    const posts = response.data;

    const postsContainer = document.getElementById("postsContainer");
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const postLink = document.createElement("a");
      postLink.href = `/post/?postId=${post.id}`;
      postLink.className = "post-link";

      const postElement = document.createElement("div");
      postElement.className = "post";

      // Create and append the title
      const titleElement = document.createElement("h3");
      titleElement.textContent = post.title;
      postElement.appendChild(titleElement);

      // Create and append the body
      const bodyElement = document.createElement("p");
      bodyElement.textContent = post.body;
      postElement.appendChild(bodyElement);

      // Create and append the media (image or fallback text)
      if (post.media) {
        const imgElement = document.createElement("img");
        imgElement.className = "homePostImg";
        imgElement.src = post.media.url;
        imgElement.alt = post.media.alt || "Post image";
        postElement.appendChild(imgElement);
      } else {
        const noImageElement = document.createElement("p");
        noImageElement.textContent = "No image available";
        postElement.appendChild(noImageElement);
      }

      // Create and append the tags
      const tagsElement = document.createElement("p");
      tagsElement.textContent = `Tags: ${post.tags.join(", ")}`;
      postElement.appendChild(tagsElement);

      // Create and append the creation date
      const createdDateElement = document.createElement("p");
      createdDateElement.textContent = `Created on: ${new Date(
        post.created
      ).toLocaleDateString()}`;
      postElement.appendChild(createdDateElement);

      postLink.appendChild(postElement);
      postsContainer.appendChild(postLink);
    });
  } catch (error) {
    console.error("Error fetching or displaying posts:", error);
  } finally {
    hideSpinner(); // Ensure spinner is hidden in all cases
  }
}

// Call the function
displayPosts();

document.addEventListener("DOMContentLoaded", displayPosts);
const logout = () => {
  storage.remove("token");

  window.location.href = "/auth/login/";
};

document.getElementById("logout-btn").addEventListener("click", function () {
  console.log("Logout button clicked");
  logout(); // Call logout function
});

// Apply authentication guard
authGuard();
