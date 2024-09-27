import { API_AUTH_REGISTER } from "../constants";
import { authFetch } from "../fetch";

export async function registerUser(formData) {
  try {
    console.log("Sending data:", formData);
    const response = await authFetch(API_AUTH_REGISTER, {
      method: "POST",

      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
