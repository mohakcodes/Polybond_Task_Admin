import Cookies from "js-cookie";

export const validateAccessToken = () => {
  const token = Cookies.get("access_token");
  if (!token) {
    localStorage.removeItem("persist:root");
    return false;
  }
  return true;
};