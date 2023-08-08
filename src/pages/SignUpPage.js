import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

import { useForm, Controller } from "react-hook-form";

const SignupPage = () => {
  const {
    handleSubmit,
    control,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, password } = data;

    try {
      setIsLoading(true);
      setError("form", { type: "submit", message: "" }); // Clear any previous form error

      const response = await signup(name, email, password);

      if (response.userId) {
        // Handle successful signup
        alert("User Registration successful. Please login now");
        navigate("/login");
      } else {
        setError("form", { type: "submit", message: response.message });
      }
    } catch (error) {
      setError("form", {
        type: "submit",
        message: "An error occurred. Please try again later.",
      });
      console.error("Signup failed", error);
    }

    setIsLoading(false);
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
          marginTop: "20%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    label="Name"
                    fullWidth
                    variant="outlined"
                    onFocus={() => {
                      clearErrors(); // Reset all errors for all fields in the form
                    }}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    label="Email"
                    fullWidth
                    variant="outlined"
                    onFocus={() => {
                      clearErrors(); // Reset all errors for all fields in the form
                    }}
                    required
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    onFocus={() => {
                      clearErrors(); // Reset all errors for all fields in the form
                    }}
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          {errors.form && <p>{errors.form.message}</p>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Signup"
            )}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" underline="always">
              Login
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignupPage;
