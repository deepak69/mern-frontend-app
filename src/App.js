import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import PlacesPage from "./components/MyPlaces";
import UsersPage from "./components/Users";
import { LoginContext } from "./context/loginContext";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./components/loginForm";
import SignupPage from "./components/signupForm";
import PlaceDetailsPage from "./components/PlaceDetailsPage";
import AddPlace from "./components/AddPlace";
import EditPlace from "./components/EditPlace";

const App = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/allUsers" element={<UsersPage />} />
        <Route exact path="/addPlace" element={<AddPlace />} />
        {isLoggedIn && (
          <>
            <Route exact path="/myPlaces/:id" element={<PlacesPage />} />
            <Route exact path="/myPlaces/" element={<PlacesPage />} />
            <Route exact path="/editPlace/:id" element={<EditPlace />} />
          </>
        )}
        <Route path="/place/:pid" element={<PlaceDetailsPage />} />
        <Route exact path="/" element={<UsersPage />} />
        <Route exact path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
