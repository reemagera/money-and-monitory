import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  Container,
  Typography,
  createTheme,
  // TextField,
  Button,Snackbar,SnackbarContent
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const theme = createTheme();

const pageStyle = {
  backgroundSize:'cover',
  backgroundPosition:'center',
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
};
function ViewBalance() {

  const customerID = useSelector((state) => state.customer.customerID);

  const [balances, setBalances] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const token = useSelector((state) => state.data.token);
  const headers = { 'Authorization': `Bearer ${token}` };
  const config = {headers: headers};

  const openSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const checkBalance = async () => {
    let mainAccountResponse = {status: 0};
    let transactionResponse = {status: 0};
    // if (customer == customerID) {
    mainAccountResponse = await axios.get(`http://localhost:8083/accounts-api/account/${customerID}`, config);
    
    transactionResponse=await axios.get(`http://localhost:8083/transactions-api/transactions/${customerID}`, config);
    // }

    if(mainAccountResponse.status===200 & transactionResponse.status===200){

    setBalances({ mainAccount: mainAccountResponse.data.accountBalance, redeem: transactionResponse.data.roundUpBalance });
    }
    else{
      openSnackbar("An error occurred. Please try again later.");
    }

      // Set both balances in the state
      
    
  };

  // const isValidCustomerID = (value) => {
  //   return value.trim() !== "";
  // };

  // const isValidPassword = (value) => {
  //   return value.length >= 8;
  // };

  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={pageStyle}>
        <Container component="main" maxWidth="xs" sx={pageStyle}>
          <CssBaseline />
          <Box style={containerStyle}>
              <Typography component="h2" variant="h5" sx={{ textAlign: 'center' , color:'#5A287D', marginBottom:'20px'}}>
                View Balance
              </Typography>
                {/* <TextField
                  label="User ID"
                  fullWidth
                  value={customer}
                  onChange={handleCustomerIDChange}
                  variant="outlined"
                  required
                  error={isInvalidCustomerID}
                  helperText={
                    isInvalidCustomerID && "Invalid User ID (at least 6 characters)"
                  }
                  sx={{ mb: 2 }}
                /> */}
                {/* <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                  variant="outlined"
                  required
                  error={isInvalidPassword}
                  helperText={
                    isInvalidPassword && "Invalid Password (8 characters)"
                  }
                /> */}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={checkBalance}
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#5A287D",
                    "&:hover": {
                      backgroundColor: "#512da8",
                    },
                  }}
                >
                  Check Balance
                </Button>
                {balances !== null && (
                  <Box mt={2} textAlign="center">
                    <Typography variant="h6" sx={{ color: "#5A287D" }}>
                      Your Main Account Balance:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5A287D" }}>
                      £{(balances.mainAccount).toFixed(2)}
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5A287D" }}>
                      Your Redeem Balance:
                    </Typography>
                    <Typography variant="h6" sx={{ color: "#5A287D" }}>
                    £{(balances.redeem).toFixed(2)}
                    </Typography>
                  </Box>
                )}
            
            <Link to="/home">
              <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#5A287D",
                    "&:hover": {
                      backgroundColor: "#c51162",
                    },
                  }}
                >
                  Go Back to Main Menu
                </Button>
                </Link>
          </Box>

        </Container>
        </div>
        <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <SnackbarContent
          message={snackbarMessage}
          style={{  backgroundColor: "white",color:"#5A287C" }}
        />
      </Snackbar>
      </ThemeProvider>
       
      
    </>
  );
}

export default ViewBalance;

