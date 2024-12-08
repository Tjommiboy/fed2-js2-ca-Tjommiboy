import { API_SOCIAL_POSTS } from "../constants";
import { load } from "../../utilities/storage";
import { headers } from "../../api/headers";
import { displaySinglePost } from "../../router/views/post";
import { authFetch } from "../fetch";

export async function readPost(postId) {
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

export async function readPosts(limit = 100, page = 1, tag) {
  try {
    const token = load("token");
    let url = `${API_SOCIAL_POSTS}?limit=${limit}&page=${page}`;
    if (tag) {
      url += `&tag=${encodeURIComponent(tag)}`;
    }
    const response = await authFetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    const posts = await response.json();

    return posts;
  } catch (error) {
    console.error("Error fetching posts: ", error);
    return [];
  }
}

export async function readPostsByUser(username, limit = 12, page = 1, tag) {}
