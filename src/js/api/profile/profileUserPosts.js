import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";
import { deletePost } from "../post/delete";

export async function loadAndDisplayUserPosts() {
  try {
    const profileData = localStorage.getItem("profile");

    if (!profileData) {
      console.error("No profile data found in localStorage");
      return;
    }

    const profile = JSON.parse(profileData);
    const username = profile.name;

    const posts = await fetchUserPosts(username);
    if (posts) displayPosts(posts);
  } catch (error) {
    console.error("Error loading or displaying posts:", error);
  }
}

async function fetchUserPosts(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.statusText}`);

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById("postsContainer");
  postsContainer.innerHTML = "";

  posts.forEach(({ id, title, body, tags, media, created }) => {
    const postLink = document.createElement("a");
    postLink.classList.add("post-link");
    postLink.href = `/post/?postId=${id}`;
    postLink.setAttribute("data-id", id);

    const editButtonHTML = `
        <button class="edit-button">Edit</button>
      `;

    const deleteButtonHTML = `
        <button class="delete-button">Delete</button>
      `;

    postLink.innerHTML = `
        <div class="post">
          <h3>${title}</h3>
          <p>${body}</p>
          <p>Tags: ${tags.join(", ")}</p>
     
          ${
            media?.url
              ? `<img src="${media.url}" alt="${media.alt || "Post media"}">`
              : ""
          }
          <p>${created}</p>
          ${editButtonHTML}
          ${deleteButtonHTML}
        </div>
      `;

    postsContainer.appendChild(postLink);

    postLink.querySelector(".edit-button").onclick = (event) => {
      event.preventDefault();
      window.location.href = `/post/edit/?postId=${id}`;
    };

    postLink.querySelector(".delete-button").onclick = (event) => {
      event.preventDefault();
      deletePost(id);
    };
  });
}
