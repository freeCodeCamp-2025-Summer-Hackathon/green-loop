

export function validateToken() {
  const token = localStorage.getItem("access_token");
  if (token){
    return true
  } else {
    return false
  }
}





export function isTokenExpired() {
  const token = localStorage.getItem("access_token");
  const timestamp = parseInt(localStorage.getItem("token_timestamp"), 10);
  const now = Date.now();
  const EXPIRY_MS = 30 * 60 * 1000; // 2 minutes

  if (!token || isNaN(timestamp)) {
    return true; // expired if no token or timestamp invalid
  }

  // return true if expired
  if (now - timestamp > EXPIRY_MS){
    return true
  } else {
    return false;
  }
}

export async function fetchUserDetails() {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found");

  const response = await fetch("http://localhost:8000/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}

export async function fetchOtherUserDetails(user_id) {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Access token not found");

  const response = await fetch(`http://localhost:8000/api/user/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return await response.json();
}


export async function refreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) throw new Error("Refresh token not found");

  const response = await fetch("http://localhost:8000/api/refresh_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error(`Refresh token failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("No access token returned during refresh");
  }

  // Save new access token and update timestamp
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("token_timestamp", Date.now().toString());

  // Optionally update refresh token if provided
  if (data.refresh_token) {
    localStorage.setItem("refresh_token", data.refresh_token);
  }

  return data.access_token;
}
