import React from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { addPlace } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddPlace = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const creator = localStorage.getItem("userId");

      // Send the form data to the backend, including the image file
      await addPlace(data, creator);
      navigate("/myPlaces");

      // Handle successful place addition
    } catch (error) {
      console.error("Failed to add place", error);
      // Handle place addition error
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom margin="4%">
        Add Place
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: "Title is required." }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Title"
              fullWidth
              required
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          defaultValue=""
          rules={{ required: "Description is required." }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Description"
              fullWidth
              multiline
              rows={4}
              required
              error={!!errors.description}
              helperText={errors.description?.message}
              sx={{ marginBottom: "16px" }}
            />
          )}
        />

        <Controller
          name="address"
          control={control}
          defaultValue=""
          rules={{ required: "Address is required." }}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              multiline
              rows={2}
              required
              error={!!errors.address}
              helperText={errors.address?.message}
              sx={{ marginBottom: "16px" }}
            />
          )}
        />

        <input
          type="file"
          accept="image/*"
          name="image"
          {...control.register("image", { required: "Image is required." })}
        />
        {errors.image && <span>{errors.image.message}</span>}

        <Button type="submit" variant="contained" color="primary">
          Add Place
        </Button>
      </form>
    </Container>
  );
};

export default AddPlace;
