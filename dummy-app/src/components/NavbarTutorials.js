import React from "react";
import {
    Button,
    Grid,
    Typography,
    Toolbar,
    AppBar,
    useMediaQuery,
    ThemeProvider,
    createTheme,
  } from "@mui/material";
  import { Link, useNavigate } from "react-router-dom";
  import LogoutIcon from '@mui/icons-material/Logout';
  import HomeIcon from '@mui/icons-material/Home';
import '../styles/AddTutorialStyle.css';
import { useDispatch } from "react-redux";
import { setCustomer, setToken } from "../store/actions";

const theme = createTheme();

function NavbarTutorials() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

    const navbarStyle = {
      width: isSmallScreen ? "100%" : "976px", // Adjust the width based on screen size
      margin: "auto",
      backgroundColor: "#5A287D",
      boxShadow:"none"
    };
    const cancelbutton = {
        marginLeft:"20px",
        border: "2px solid #ad1982", // Adjust the border style as needed
        borderRadius: "4px", // Optional: Add rounded corners
        backgroundColor: "#ad1982",
      };

  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  function navToLogout() {
    dispatch(setCustomer(null));
    dispatch(setToken(null));
    navigate("/");
  }
  
  return (
    <ThemeProvider theme={theme}>
      <Grid className="contentbg">
        <AppBar position="static" style={navbarStyle}>
          <Toolbar>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6">Spend2Save</Typography>
              </Grid>

              <Grid item xs={6}>
                <Grid
                  container
                  justifyContent="flex-end"
                >
                  <Link to="/home">
                    <Button
                    size="small"
                      style={cancelbutton}
                      variant="contained"
                      endIcon={<HomeIcon />}
                    >
                      Home
                    </Button>
                  </Link>
                    <Button
                    size="small"
                      style={cancelbutton}
                      onClick={navToLogout}
                      variant="contained"
                      endIcon={<LogoutIcon />}
                    >
                      Logout
                    </Button>
                </Grid>
              </Grid>

            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </ThemeProvider>
  );
}

export default NavbarTutorials;
