import { API_SOCIAL_POSTS } from "../constants";

import { authFetch } from "../fetch";

export async function createPost({ title, body, tags, media }) {
  try {
    const postData = {
      title: title,
      body: body,
      tags: tags,
      media: media,
    };

    const response = await authFetch(API_SOCIAL_POSTS, {
      method: "POST",

      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    const data = await response.json();

    window.location.href = "/";
  } catch (error) {
    console.error("Error creating post:", error);
  }
}
