import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Grid,
  TextField,
  Typography,
  createTheme,
  Button,Snackbar,SnackbarContent
} from "@mui/material";
import { ThemeProvider } from "styled-components";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCustomer, setToken } from "../store/actions";

const theme = createTheme();

const pageStyle = {
  backgroundColor: "#5A287D",
  color: "white",
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};
const containerStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly transparent white background
  padding: "20px",
  borderRadius: "8px", // Rounded corners for the container
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  marginLeft:"auto"
};
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerID: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const clearForm = () => {
    setFormData({
      customerID: "",
      password: "",
    });
  };

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const closeSnackbar = () => {
    setSnackbarOpen(false);
  };
  const validateUser = (event) => {
    event.preventDefault();

    const { customerID, password } = formData;

    if (!isValidCustomerID(customerID)) {
      setIsInvalidUsername(true);
      setIsInvalidPassword(false);
      openSnackbar("Invalid Customer ID");
      return;
    }

    if (!isValidPassword(password)) {
      setIsInvalidPassword(true);
      setIsInvalidUsername(false);
      openSnackbar("Enter a password");
      return;
    }

    axios
      .post("http://localhost:8083/auth/token", {
        "username": formData.customerID,
        "password": formData.password
      })
      .then((response) => {
        if (response.status === 200) {
          dispatch(setToken(response.data));
          dispatch(setCustomer(customerID));
          navigate("/home");
        } else {
          openSnackbar("Login failed. Please check your credentials.");
          clearForm();
        }
      })
      .catch((error) => {
        console.error("An error occurred during login:", error);
        openSnackbar("An error occurred during login. Please try again later.");
        clearForm();
      });
  };

  const isValidCustomerID = (customerID) => {
    return customerID.trim() !== "";
  };

  const isValidPassword = (password) => {
    return password.length >= 1;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
      <div style={pageStyle}>
        <Container component="main" maxWidth="xs" sx={pageStyle}>
          <CssBaseline />
          <Box style={containerStyle} sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"70vh"}}>
            <Typography component="h2" variant="h5" sx={{marginLeft:'9px',color:'#5A287D'}}>
              Login
            </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={validateUser}
            sx={{ mt: 3 }}
            bgcolor="white"
            p={3}
            width="80%"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  name="customerID"
                  id="customerID"
                  label="Customer ID"
                  autoFocus
                  fullWidth
                  value={formData.customerID}
                  onChange={handleInputChange}
                  error={isInvalidUsername}
                  helperText={isInvalidUsername && "Invalid Customer ID"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  id="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={formData.password}
                  onChange={handleInputChange}
                  error={isInvalidPassword}
                  helperText={
                    isInvalidPassword && "Invalid password (min 8 characters)"
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#5A287D",
                "&:hover": {
                  backgroundColor: "#512da8",
                },
              }}
            >
              Login
            </Button>
            <Link to="/add">Sign Up</Link>
          </Box>
          </Box>

        </Container>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000} // Adjust as needed
          onClose={closeSnackbar}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <SnackbarContent
            message={snackbarMessage}
            style={{ backgroundColor: "white",color:"#5A287C" }} // Customize the style as needed
          />
        </Snackbar>
      </ThemeProvider>
    </>
  );
}

export default Login;