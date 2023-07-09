import React from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  TextareaAutosize,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { addPlace } from "../services/api";

const AddPlace = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Handle form submission and create a place
    try {
      const { title, description } = data;
      const creator = localStorage.getItem("userId");
      await addPlace(title, description, creator);
      // Handle successful place addition
    } catch (error) {
      console.error("Failed to add place", error);
      // Handle place addition error
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Add Place
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: "100%", // Set form width to 100% of the container
            mt: 2, // Add some spacing at the top
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                fullWidth
                {...register("title", { required: true })}
                error={!!errors.title}
                helperText={errors.title && "Title is required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                minRows={4}
                label="Description"
                fullWidth
                {...register("description", { required: true })}
                error={!!errors.description}
                helperText={errors.description && "Description is required"}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Place
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddPlace;
