import { NavigateFunction } from "react-router-dom";

export const checkSignedIn = (navigate: NavigateFunction) => {
  if (!document.cookie.includes("user_data=")) {
    navigate("/signin");
  }
};

export const getUserData = () => {
  if (!document.cookie || !document.cookie.includes("user_data=")) return null;

  return JSON.parse(document.cookie.split("user_data=")[1]);
};

export const refreshCookie = async (navigate: NavigateFunction) => {
  const userData = await fetch(
    // @ts-expect-error
    `${import.meta.env.VITE_BACKEND_URL}/api/users/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
    }
  )
    .then((res) => res.json())
    .catch(() => null);

  if (!userData) {
    navigate("/signin");
  }

  document.cookie = `user_data=${JSON.stringify({
    id: userData[0],
    name: userData[1],
    email: userData[2],
    membership: userData[3],
    admin: userData[4],
  })}; SameSite=Lax; Secure; Path=/;`;
};
