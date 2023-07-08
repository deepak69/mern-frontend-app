const BASE_URL = "http://localhost:5000"; // Replace with your API URL

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    return data;
    // Handle response data
  } catch (error) {
    console.error("Login failed", error);
  }
};

export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    return data;
    // Handle response data
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw new Error("Failed to fetch users");
  }
};

export const getPlacesByUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/places/user/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch places", error);
    throw error;
  }
};

export const getPlaceById = async (placeId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/places/user/${placeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch places", error);
    throw error;
  }
};
