import React from "react";
import { Typography, Container } from "@mui/material";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" align="center">
        Oops! The page you are looking for does not exist.
      </Typography>
    </Container>
  );
};

export default NotFoundPage;
