import axios from "axios";

const BASE_URL = process.env.REACT_APP_URL_PATH; // Replace with your API URL

console.log(BASE_URL, "checking base");

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
        "Content-Type": "multipart/form-data",
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

export const addPlace = async (formData, creator) => {
  try {
    const token = localStorage.getItem("token"); // Assuming you have stored the token in localStorage
    const response = await axios.post(
      `${BASE_URL}/api/places`,
      { ...formData, creator },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to add place", error);
    throw error;
  }
};

export const updatePlace = async (placeId, updatedPlace) => {
  try {
    const token = localStorage.getItem("token"); // Assuming you have stored the token in localStorage
    const response = await axios.patch(
      `${BASE_URL}/api/places/${placeId}`,
      updatedPlace,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
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
