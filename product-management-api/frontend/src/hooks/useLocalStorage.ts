import { STORAGE_KEYS } from "../utils/constants";

export function saveToken(token: string) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN);
}

export function removeToken() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
}

export function saveUser(user: unknown) {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem(STORAGE_KEYS.USER);

  return user ? JSON.parse(user) : null;
}

export function removeUser() {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

export function clearStorage() {
  localStorage.clear();
}