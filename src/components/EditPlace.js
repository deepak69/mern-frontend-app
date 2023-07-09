import React, { useEffect, useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { getPlaceById, updatePlace } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditPlace = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const { place } = await getPlaceById(id);
        setTitle(place.title);
        setDescription(place.description);
        setAddress(place.address);
      } catch (error) {
        console.error("Failed to fetch place details", error);
      }
    };

    fetchPlaceDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updatePlace(id, { title, description, address });
      navigate("/myPlaces");
      // Handle successful place update
    } catch (error) {
      console.error("Failed to update place", error);
      // Handle place update error
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom margin="4%">
        Edit Place
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Address"
          fullWidth
          multiline
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Update Place
        </Button>
      </form>
    </Container>
  );
};

export default EditPlace;
