import React, { useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginContext } from "../context/loginContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLoggedIn, handleLogout } = useContext(LoginContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate("/allUsers")}
        >
          ExplorePoint
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              edge="end"
              sx={{ ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem>
                <Link href="/allUsers" color="inherit" underline="none">
                  All Users
                </Link>
              </MenuItem>
              {isLoggedIn ? (
                <>
                  <MenuItem>
                    <Link href="/myPlaces" color="inherit" underline="none">
                      My Places
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/addPlace" color="inherit" underline="none">
                      Add Place
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Link href="#" color="inherit" underline="none">
                      Logout
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <MenuItem>
                  <Link href="/login" color="inherit" underline="none">
                    Login
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit">
              <Link href="/allUsers" color="inherit" underline="none">
                All Users
              </Link>
            </Button>

            {isLoggedIn ? (
              <>
                <Button color="inherit">
                  <Link href="/myPlaces" color="inherit" underline="none">
                    My Places
                  </Link>
                </Button>
                <Button color="inherit">
                  <Link href="/addPlace" color="inherit" underline="none">
                    Add Place
                  </Link>
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <Link href="/login" color="inherit" underline="none">
                  Login
                </Link>
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
