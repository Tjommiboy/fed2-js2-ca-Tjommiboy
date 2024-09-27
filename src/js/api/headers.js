import { load } from "../utilities/storage";
import { API_KEY } from "./constants";

export function headers(hasBody = false) {
  const headers = new Headers();
  const token = load("token");
  const profile = load("profile");

  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  if (profile && profile.username) {
    headers.append("X-User-Profile", profile.username);
  }
  if (API_KEY) {
    headers.append("X-Noroff-API-Key", API_KEY);
  }

  if (hasBody) {
    headers.append("Content-Type", "application/json");
  }

  return headers;
}
