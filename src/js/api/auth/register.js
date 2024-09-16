import { API_BASE } from "../constants";
import { API_AUTH_REGISTER } from "../constants";

export async function registerUser(formData) {
  try {
    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
