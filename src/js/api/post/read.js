import { API_SOCIAL_POSTS } from "../constants";
import { load } from "../../utilities/storage";

import { authFetch } from "../fetch";

export async function readPost(id) {}

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
