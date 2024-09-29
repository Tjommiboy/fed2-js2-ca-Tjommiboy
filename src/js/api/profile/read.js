export async function readProfile(username) {
  //   console.log("localStorage contents:", localStorage);

  const profileData = localStorage.getItem("profile"); // Ensure this matches how you stored it

  if (profileData) {
    const profile = JSON.parse(profileData);

    const profileContainer = document.getElementById("profileContainer");

    const usernameElement = document.createElement("h2");
    usernameElement.id = "username";
    usernameElement.textContent = profile.name || "No username available";
    profileContainer.appendChild(usernameElement);

    const avatar = document.createElement("img");
    avatar.id = "avatar";
    avatar.src = profile.avatar?.url || "default-avatar.png";
    avatar.classList.add("avatar");
    profileContainer.appendChild(avatar);

    const bio = document.createElement("p");
    bio.id = "bio";
    bio.textContent = profile.bio || "No bio available";
    profileContainer.appendChild(bio);

    const email = document.createElement("p");
    email.id = "email";
    email.textContent = profile.email || "No email available";
    profileContainer.appendChild(email);
  } else {
    console.error("Profile not found in localStorage");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  readProfile("username");
});

export async function readProfiles(limit, page) {}
