import React, { useContext, useState, useEffect } from "react";
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

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleLoginSuccess } = useContext(LoginContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Clear the form fields when the component mounts or when isLoading changes
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    // Form validation
    if (!email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(""); // Clear any previous error

    try {
      const response = await login(email, password);

      if (response.message === "Logged in") {
        const { token, email } = response;
        let userResults;
        let filteredUsers;
        let currentUser;
        try {
          userResults = await getUsers();
          filteredUsers = userResults.users.filter(
            (user) => user.email === email
          );
          currentUser = filteredUsers.length > 0 ? filteredUsers[0] : null;
          localStorage.setItem("userId", currentUser.id);
          localStorage.setItem("myPlaces", currentUser?.places.length);
        } catch (error) {}

        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/allUsers");
        handleLoginSuccess(currentUser.id);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
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
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            width: "100%", // Set form width to 100% of the container
            mt: 2, // Add some spacing at the top
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          {error && <p>{error}</p>}
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
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
