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
  import { Link } from "react-router-dom";
  import LockOpenIcon from "@mui/icons-material/LockOpen";
import '../styles/AddTutorialStyle.css';

const theme = createTheme();

function NavbarAdd() {
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
    const cancelbutton = {
      border: "2px solid #ad1982", // Adjust the border style as needed
      borderRadius: "4px", // Optional: Add rounded corners
      backgroundColor: "#ad1982",
    };

    const navbarStyle = {
      width: isSmallScreen ? "100%" : "1119px", // Adjust the width based on screen size
      paddingRight: isSmallScreen ? "0px" : "60px",
      margin: "auto",
      backgroundColor: "#5A287D",
      boxShadow:"none",
    };
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
                  <Link to="/login">
                    <Button
                      style={cancelbutton}
                      variant="contained"
                      endIcon={<LockOpenIcon />}
                    >
                      Login
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    </ThemeProvider>
  );
}

export default NavbarAdd;
