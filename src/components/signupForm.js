import React, { useContext, useEffect, useState } from "react";
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
import { LoginContext } from "../context/loginContext";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the form fields when the component mounts or when isLoading changes
    setName("");
    setEmail("");
    setPassword("");
  }, [isLoading]);

  const { handleLoginSuccess } = useContext(LoginContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setPassword("");
    // Form validation
    if (!name || !email || !password) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    setError(""); // Clear any previous error

    try {
      const response = await signup(name, email, password);
      if (response.user) {
        // Handle successful signup
        console.log(response.user);
        navigate("/");
        handleLoginSuccess();
      } else if (response.error) {
        setError(response.error); // Display specific error message from the server
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("An error occurred. Please try again later.");
      console.error(error);
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
          Signup
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
                type="text"
                label="Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
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
              "Signup"
            )}
          </Button>
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account?{" "}
            <Link href="/login" underline="always">
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
