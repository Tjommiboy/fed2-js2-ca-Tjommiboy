import { API_AUTH_LOGIN } from "../constants";
import * as storage from "../../utilities/storage";

import { authFetch } from "../fetch";

export async function loginUser({ email, password }) {
  try {
    const response = await authFetch(API_AUTH_LOGIN, {
      method: "POST",

      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const responseData = await response.json();

    const accessToken = responseData.data.accessToken;
    const profile = {
      name: responseData.data.name,
      email: responseData.data.email,
      avatar: responseData.data.avatar,
      banner: responseData.data.banner,
      bio: responseData.data.bio,
    };
    storage.save("token", accessToken);
    storage.save("profile", profile);

    console.log(responseData);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
