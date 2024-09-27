import { API_SOCIAL_PROFILES } from "../constants";
import { headers } from "../headers";

// Function to fetch user posts based on profile data
export async function loadAndDisplayUserPosts() {
  try {
    const profileData = localStorage.getItem("profile");

    if (!profileData) {
      console.error("No profile data found in localStorage");
      return;
    }

    const profile = JSON.parse(profileData); // Parse the profile data
    const username = profile.name;

    // Fetch posts and display them in one step
    const posts = await fetchUserPosts(username);
    if (posts) displayPosts(posts);
  } catch (error) {
    console.error("Error loading or displaying posts:", error);
  }
}

// Fetch posts function
async function fetchUserPosts(username) {
  try {
    const response = await fetch(`${API_SOCIAL_PROFILES}/${username}/posts`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok)
      throw new Error(`Failed to fetch posts: ${response.statusText}`);

    const { data } = await response.json();
    console.log({ data });
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
    <button class="edit-button" onclick="event.preventDefault(); window.location.href='/post/edit/?postId=${id}';">Edit</button>
  `;
    postLink.innerHTML = `
        <div class="post">
          <h3>${title}</h3>
          <p>${body}</p>
          <p>Tags: ${tags.join(", ")}</p>
          ${editButtonHTML}
          ${
            media?.url
              ? `<img src="${media.url}" alt="${media.alt || "Post media"}">`
              : ""
          }
<p>${created}</>
        </div>
      `;
    // // Create the edit button
    // const editButton = document.createElement("button");
    // editButton.textContent = "Edit";
    // editButton.onclick = (event) => {
    //   event.preventDefault();
    //   window.location.href = `/post/edit/?postId=${id}`; // Redirect to the edit page
    // };

    // // Append the edit button to the post link
    // postLink.appendChild(editButton);

    postsContainer.appendChild(postLink);
  });
}
