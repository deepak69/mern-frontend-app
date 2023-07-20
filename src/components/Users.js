import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  Modal,
  Box,
} from "@mui/material";
import { getUsers } from "../services/api";
import { LoginContext } from "../context/loginContext";
import { Link, useNavigate } from "react-router-dom";

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { isLoggedIn } = useContext(LoginContext);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await getUsers();

        if (response.users) {
          setUsers(response.users);
        } else if (response.error) {
          setError(response.error);
        } else {
          setError("Failed to fetch users. Please try again later.");
        }
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Failed to fetch users", error);
      }

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleCardClick = (userId, noOfPlaces) => {
    if (isLoggedIn) {
      if (noOfPlaces > 0) {
        navigate(`/myPlaces/${userId}`);
      }
    } else {
      // Show the login modal
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Container maxWidth="md" style={{ paddingTop: "2%" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Users' Favorite Places
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
              {users &&
                users.length > 0 &&
                users.map((user) => (
                  <Grid item xs={12} sm={6} md={4} key={user.id}>
                    <Card
                      onClick={() =>
                        handleCardClick(user.id, user.places.length)
                      }
                      style={{
                        cursor: "pointer",
                        height: "100%",
                        backgroundColor: "#f7f7f7",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardContent>
                        <Avatar
                          style={{
                            backgroundColor: "#3f51b5",
                            marginBottom: "16px",
                          }}
                        >
                          {user.name.charAt(0)}
                        </Avatar>
                        <Typography variant="h6" style={{ marginTop: "8px" }}>
                          {user.name}
                        </Typography>
                        <Typography
                          variant="body1"
                          style={{ marginTop: "8px" }}
                        >
                          Number of Places: {user.places.length}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              {users && users.length === 0 && (
                <Grid item xs={12}>
                  <Typography
                    variant="h6"
                    align="center"
                    style={{ padding: "10%" }}
                  >
                    Currently, we don't have any users and their places on the
                    site. Please start by signing up.
                  </Typography>
                </Grid>
              )}
            </Grid>
          )}
        </>
      )}
      <Modal open={showModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom>
            Please log in to view places
          </Typography>
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="primary"
            fullWidth
          >
            Log In
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default UsersPage;
