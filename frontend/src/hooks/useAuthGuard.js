import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired, refreshToken } from "../utils/utils";

export function useAuthGuard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const refresh = localStorage.getItem("refresh_token");

    if (token && refresh && !(isTokenExpired())) {
      return; // if token and refresh don't do anythinf
    }

    if (!token) {
      navigate("/auth/login");
      return;
    }

    if (isTokenExpired()) {
      refreshToken()
        .catch((refreshError) => {
            console.log('refresh error', refreshError)
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate("/auth/login");
        });
    } else {
        navigate("/dashboard")
    }
  }, [navigate]);
}
