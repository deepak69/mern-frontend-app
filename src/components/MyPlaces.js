import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CardActions,
  Button,
} from "@mui/material";
import { deletePlace, getPlacesByUser } from "../services/api";
import { LoginContext } from "../context/loginContext";
import MapIcon from "@mui/icons-material/Map";

const MyPlaces = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const param = useParams();
  const { isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsLoading(true);
      setError("");
      let userId;

      if (param.id) {
        userId = param.id;
      } else {
        userId = localStorage.getItem("userId");
      }

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
  }, [param.id]);

  const handleDeletePlace = (id) => {
    try {
      deletePlace(id);
      window.location.reload();
    } catch (error) {
      setError("unable to delete place");
      console.error("Failed to delete places", error);
    }
  };

  const editThisPlace = (id) => {
    navigate(`/editPlace/${id}`);
  };

  const viewLocationOnMaps = (address) => {
    window.open(`https://maps.google.com/maps?q=${address}`, "_blank");
  };

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
              {places &&
                places.length > 0 &&
                places.map((place) => (
                  <Grid item xs={12} sm={4} md={4} key={place.id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">
                          <img
                            src={`${process.env.REACT_APP_URL_PATH}/${place?.image}`}
                            width="100%"
                            alt="place"
                          />
                        </Typography>
                        <Typography variant="h6">{place.title}</Typography>
                        <Typography variant="body1">
                          <b>About:</b> {place.description}
                        </Typography>
                      </CardContent>
                      {isLoggedIn &&
                        place.creator === localStorage.getItem("userId") && (
                          <CardActions>
                            <Button
                              type="submit"
                              variant="contained"
                              color="primary"
                              onClick={() => editThisPlace(place.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              type="submit"
                              variant="contained"
                              color="error"
                              onClick={() => handleDeletePlace(place.id)}
                            >
                              Delete
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<MapIcon />}
                              onClick={() => viewLocationOnMaps(place.address)}
                            >
                              Map
                            </Button>
                          </CardActions>
                        )}
                    </Card>
                  </Grid>
                ))}
              {places && places.length === 0 && (
                <Grid padding="10%">
                  <Card>
                    <CardContent>
                      You have zero places with this user Id. please click on
                      the add place in the menu and start adding places
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}
    </Container>
  );
};

export default MyPlaces;
