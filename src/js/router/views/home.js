import { authGuard } from "../../utilities/authGuard";
import * as storage from "../../utilities/storage";
import { readPosts } from "../../api/post/read.js";
import { load } from "../../utilities/storage";

async function displayPosts() {
  const response = await readPosts();
  const posts = response.data;
  const currentUser = load("profile");
  const postsContainer = document.getElementById("postsContainer");

  postsContainer.innerHTML = "";

  posts.forEach((post) => {
    const postLink = document.createElement("a");
    postLink.href = `/post/?postId=${post.id}`;
    postLink.className = "post-link";

    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p> 
            ${
              post.media
                ? `<img class="homePostImg" src="${post.media.url}" 
            alt="${post.media.alt || "Post image"}" class="homePostImg"/>`
                : "<p>No image available</p>"
            }
            <p>Tags: ${post.tags.join(", ")}</p> 
            <p>Created on: ${new Date(post.created).toLocaleDateString()}</p> 
        `;

    postLink.appendChild(postElement);

    postsContainer.appendChild(postLink);
  });
}
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
