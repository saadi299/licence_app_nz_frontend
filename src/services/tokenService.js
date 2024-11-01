"use client";

const setAuthUserToLocalStorage = (data) => {
  const now = Date.now();
  const expiryTime = now + data.expires_in * 1000;
  data.expiryTime = expiryTime;
  if (typeof window === "undefined") {
    return {};
  }
  localStorage.setItem("user", JSON.stringify(data));
};

const isAuthenticated = () => {
  let userDataString = {};
  if (typeof window === "undefined") {
    return userDataString;
  }
  userDataString = localStorage.getItem("user");

  if (!userDataString) {
    return false; // No user data found in localStorage
  }

  const userData = JSON.parse(userDataString);
  const accessToken = userData.access_token;
  const expiryTime = userData.expiryTime;

  if (!accessToken || !expiryTime) {
    return false; // Access token or expiry time is missing
  }
  const currentTime = Date.now();
  if (currentTime >= expiryTime) {
    return false; // Token has expired
  }

  return true; // User is authenticated
};

const getAuthUserDetail = () => {
  let userDataString = {};
  if (typeof window === "undefined") {
    return userDataString;
  }
  userDataString = localStorage.getItem("user");

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const detail = userData.detail;
    return detail;
  }
};

const getAccessToken = () => {
  let userDataString = {};
  if (typeof window === "undefined") {
    return userDataString;
  }
  userDataString = localStorage.getItem("user");

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const accessToken = userData.access_token;
    return accessToken;
  }
};

const getRefreshToken = () => {
    let userDataString = {};
    if (typeof window === "undefined") {
      return userDataString
    }
    userDataString = localStorage.getItem("user");

  if (userDataString) {
    const userData = JSON.parse(userDataString);
    const refreshToken = userData.refresh_token;
    return refreshToken;
  }
};

const removeUserFromLocalStorage = () => {
  if (typeof window === "undefined") {
    return
  }
  localStorage.removeItem("user");
};

const TokenService = {
  setAuthUserToLocalStorage,
  isAuthenticated,
  getAccessToken,
  getRefreshToken,
  removeUserFromLocalStorage,
  getAuthUserDetail,
};

export default TokenService;
