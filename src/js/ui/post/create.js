import { createPost } from "../../api/post/create";

export async function onCreatePost(event) {
  event.preventDefault();
  const formData = {
    title: document.getElementById("title").value,
    body: document.getElementById("body").value,
    tags: document
      .getElementById("tags")
      .value.split(",")
      .map((tag) => tag.trim()),
    media: {
      url: document.getElementById("media-url").value,
      alt: document.getElementById("media-alt").value,
    },
  };
  createPost(formData)
    .then((response) => {
      console.log("createPost successful", response);
      window.location.href = "/";
    })
    .catch((error) => {
      console.error("create failed", error);
    });
}
