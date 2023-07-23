import React, { useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { getPlaceById, updatePlace } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditPlace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const { place } = await getPlaceById(id);
        setValue("title", place.title);
        setValue("description", place.description);
        setValue("address", place.address);
      } catch (error) {
        console.error("Failed to fetch place details", error);
      }
    };

    fetchPlaceDetails();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      await updatePlace(id, data);
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
        <Button type="submit" variant="contained" color="primary">
          Update Place
        </Button>
      </form>
    </Container>
  );
};

export default EditPlace;
