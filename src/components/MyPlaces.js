import React, { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Card, CardContent, Grid } from "@mui/material";
import { getPlacesByUser } from "../services/api";
import { LoginContext } from "../context/loginContext";

const MyPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError("");
      const userId = localStorage.getItem("userId");

      console.log(userId);

      try {
        const response = await getPlacesByUser(userId);

        if (response.places) {
          setPlaces(response.places);
        } else if (response.error) {
          setError(response.message);
        } else {
          setError("Failed to fetch places. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Failed to fetch places", error);
      }

      setIsLoading(false);
    };

    fetchPlaces();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom padding="2%">
        My Places
      </Typography>
      {isLoading ? (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      ) : (
        <>
          {error ? (
            <Typography
              variant="body1"
              align="center"
              color="error"
              gutterBottom
            >
              {error}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {places.map((place) => (
                <Grid item xs={12} sm={6} md={4} key={place.id}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{place.title}</Typography>
                      <Typography variant="body1">
                        Description: {place.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default MyPlaces;
