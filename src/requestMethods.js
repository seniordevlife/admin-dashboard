import axios from "axios";

const BASE_URL = "https://www.sardonyxsoundsaudio.com/api/";
let TOKEN = null;

try {
  TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
    .currentUser?.accessToken;
} catch {
  TOKEN = null;
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
