import axios from "axios";

const BASE_URL = "http://localhost:5000"; // Replace with your API URL

let token = localStorage.getItem("token");

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
    const response = await fetch(`${BASE_URL}/api/places/${placeId}`, {
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

export const addPlace = async (title, description, creator, address) => {
  try {
    const response = await fetch(`${BASE_URL}/api/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, address, creator }),
    });

    if (!response.ok) {
      // Handle non-2xx response status
      throw new Error("Failed to add place");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to add place", error);
    throw error;
  }
};

export const updatePlace = async (placeId, updatedPlace) => {
  try {
    const response = await fetch(`${BASE_URL}/api/places/${placeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedPlace),
    });

    if (!response.ok) {
      // Handle non-2xx response status
      throw new Error("Failed to update place");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update place", error);
    throw error;
  }
};

export const deletePlace = async (placeId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/places/${placeId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to delete place", error);
    throw error;
  }
};

export const getPlaceByPlaceId = async (placeId) => {};
