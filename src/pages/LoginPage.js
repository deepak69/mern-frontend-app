import React, { useContext, useState } from "react";
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
import { getUsers, login } from "../services/api";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const { handleLoginSuccess } = useContext(LoginContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      setIsLoading(true);
      setError("form", { type: "submit", message: "" }); // Clear any previous form error

      const response = await login(email, password);

      if (response.userId) {
        const { token, email } = response;
        let userResults;
        let filteredUsers;
        let currentUser;

        try {
          userResults = await getUsers();

          const expirationdate = new Date(
            new Date().getTime() + 60 * 60 * 1000
          );

          filteredUsers = userResults.users.filter(
            (user) => user.email === email
          );
          currentUser = filteredUsers.length > 0 ? filteredUsers[0] : null;

          localStorage.setItem("userId", currentUser.id);
          localStorage.setItem("token", token);
          localStorage.setItem("myPlaces", currentUser?.places.length);
          localStorage.setItem("expirationdate", expirationdate.toISOString());
          localStorage.setItem("isLoggedIn", "true");
        } catch (error) {}
        navigate("/allUsers");
        handleLoginSuccess(currentUser.id);
      } else {
        setError("form", { type: "submit", message: response.message });
      }
    } catch (error) {
      setError("form", {
        type: "submit",
        message: "An error occurred. Please try again later.",
      });
      console.error("Login failed", error);
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
          marginTop: "30%",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
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
                    required
                    onFocus={() => {
                      clearErrors(); // Reset all errors for all fields in the form
                    }}
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
              "Login"
            )}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account?{" "}
            <Link href="/signup" underline="always">
              Sign up
            </Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
