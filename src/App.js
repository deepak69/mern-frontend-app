import React, { useContext, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { LoginContext } from "./context/loginContext";
import { CircularProgress } from "@mui/material";

const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage"));
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const SignupPage = React.lazy(() => import("./pages/SignUpPage"));
const PlaceDetailsPage = React.lazy(() =>
  import("./components/PlaceDetailsPage")
);
const AddPlace = React.lazy(() => import("./components/AddPlace"));
const EditPlace = React.lazy(() => import("./components/EditPlace"));
const PlacesPage = React.lazy(() => import("./components/MyPlaces"));
const UsersPage = React.lazy(() => import("./components/Users"));

const App = () => {
  const { isLoggedIn } = useContext(LoginContext);

  return (
    <Router>
      <Header />
      <Suspense
        fallback={
          <div className="center">
            <CircularProgress />
          </div>
        }
      >
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
      </Suspense>
    </Router>
  );
};

export default App;
