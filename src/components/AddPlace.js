import React, { useState } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { addPlace } from "../services/api";
import { useNavigate } from "react-router-dom";

const AddPlace = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission and create a place
    try {
      const creator = localStorage.getItem("userId");
      await addPlace(title, description, creator, address);
      navigate("/myPlaces");

      // Handle successful place addition
    } catch (error) {
      console.error("Failed to add place", error);
      // Handle place addition error
    }
  };

  return (
    // <Container maxWidth="xs">
    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       alignItems: "center",
    //       mt: 8,
    //     }}
    //   >
    //     <Typography variant="h4" align="center" gutterBottom>
    //       Add Place
    //     </Typography>
    //     <Box
    //       component="form"
    //       onSubmit={handleSubmit(onSubmit)}
    //       sx={{
    //         width: "100%", // Set form width to 100% of the container
    //         mt: 2, // Add some spacing at the top
    //       }}
    //     >
    //       <Grid container spacing={2}>
    //         <Grid item xs={12}>
    //           <TextField
    //             label="Title"
    //             fullWidth
    //             {...register("title", { required: true })}
    //             error={!!errors.title}
    //             helperText={errors.title && "Title is required"}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextareaAutosize
    //             minRows={3}
    //             label="Description"
    //             fullWidth
    //             {...register("description", { required: true })}
    //             error={!!errors.description}
    //             helperText={errors.description && "Description is required"}
    //           />
    //         </Grid>
    //         <Grid item xs={12}>
    //           <TextareaAutosize
    //             minRows={2}
    //             label="Address"
    //             fullWidth
    //             {...register("address", { required: true })}
    //             error={!!errors.address}
    //             helperText={errors.address && "Address is required"}
    //           />
    //         </Grid>
    //       </Grid>
    //       <Button
    //         type="submit"
    //         variant="contained"
    //         color="primary"
    //         fullWidth
    //         sx={{ mt: 2 }}
    //       >
    //         Add Place
    //       </Button>
    //     </Box>
    //   </Box>
    // </Container>
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom margin="4%">
        Add Place
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Description"
          fullWidth
          multiline
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />

        <TextField
          label="Address"
          fullWidth
          multiline
          rows={2}
          onChange={(e) => setAddress(e.target.value)}
          required
          sx={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Place
        </Button>
      </form>
    </Container>
  );
};

export default AddPlace;
