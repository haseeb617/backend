import axios from "axios";
import { BASE_URL } from "./config";
import { clearAsyncData, getAsyncData, setAsyncData } from "@/store/storage";
import { logout } from "./authService";

export const refresh_tokens = async () => {
  try {
    const refreshToken = await getAsyncData("refresh_token");

    const response = await axios.post(`${BASE_URL}/auth/refresh-token`, {
      refresh_token: refreshToken,
    });

    const new_access_token = response.data.access_token;
    const new_refresh_token = response.data.refresh_token;

    await setAsyncData("access_token", new_access_token);
    await setAsyncData("refresh_token", new_refresh_token);

    return new_access_token;
  } catch (error) {
    console.log("REFRESH TOKEN ERROR");
    clearAsyncData();
    logout();
  }
};

export const appAxios = axios.create({
  baseURL: BASE_URL,
});

appAxios.interceptors.request.use(async (config) => {
  const accessToken = await getAsyncData("access_token");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

appAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        const newAccessToken = await refresh_tokens();
        if (newAccessToken) {
          error.config.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(error.config);
        }
      } catch (error) {
        console.log("Error refreshing token");
      }
    }

    return Promise.reject(error);
  }
);
