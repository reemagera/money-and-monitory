import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTutorial } from "../actions/TutorialsActions";
import NavbarAdd from "./NavbarAdd";
import "@mui/lab/AdapterDateFns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Paper,
  Avatar,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "../styles/AddTutorialStyle.css";
import MuiAlert from "@mui/material/Alert";
import "../styles/AddTutorialStyle.css";

const theme = createTheme();

export const AddTutorial = () => {
  const [errorCustomerIdText, setErrorCustomerIdText] = useState("");
  const [errorCustomerIdState, setErrorCustomerIdState] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [errorState, setErrorState] = useState(false);
  const [errorEmailState, setEmailErrorState] = useState(false);
  const [errorEmailText, setEmailErrorText] = useState("");
  const [errorNameState, setNameErrorState] = useState(false);
  const [errorNameText, setNameErrorText] = useState("");
  const [errorPasswordState, setPasswordErrorState] = useState(false);
  const [errorPasswordText, setPasswordErrorText] = useState("");
  const [errorConfirmState, setConfirmErrorState] = useState(false);
  const [errorConfirmText, setConfirmErrorText] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowCPassword = () => setShowCPassword(!showCPassword);
  const handleMouseDownCPassword = () => setShowCPassword(!showCPassword);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const snackbarColor = { backgroundColor: "#ad1982" };
  const paperStyle = { padding: "30px 20px", width: 400, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#ad1982" };
  const buttonStyle = {
    backgroundColor:
      errorCustomerIdState ||
      errorState ||
      errorNameState ||
      errorEmailState ||
      errorConfirmState ||
      errorPasswordState
        ? "grey"
        : "#ad1982",
    margin: "15px 0px 30px",
    color: "white",
    display: "flex",
    alignItems: "center",
    width: "100%",
  };
  const cancelbutton = {
    border: "2px solid #ad1982", // Adjust the border style as needed
    borderRadius: "4px", // Optional: Add rounded corners
    backgroundColor: "#ad1982",
    color: "white",
  };
  const content = {
    width: isSmallScreen ? "100%" : "1119px",
    height: "100%",
    margin: "auto",
  };
  const h1signup = {
    fontWeight: "normal",
    fontSize: "2rem",
    lineHeight: 1.5,
    marginTop: "2rem",
    marginBottom: "1.5rem",
    width: "100%",
    borderBottom: "0px solid #B4A99F",
    color: "#42145F",
    marginBlockStart: "0.67em",
    marginBlockEnd: "0.67em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
    fontFamily: "RNHouseSans-Regular, Verdana, Helvetica, San-serif",
  };

  const pointsdisplayed = {
    fontSize: "1em",
    textAlign: "left",
    color: "#333333",
    fontFamily: "RNHouseSans-Regular, Verdana, Helvetica, San-serif",
  };
  const demo = { padding: "0 0 16px 16px" };

  const [tutorial, setTutorial] = useState({
    id: null,
    customerId: "",
    accountNumber: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const onChangeCustomerId = (e) => {
    setTutorial({ ...tutorial, customerId: e.target.value });
  };

  const onChangeaccountNumber = (e) => {
    setTutorial({ ...tutorial, accountNumber: e.target.value });
  };

  const onChangename = (e) => {
    setTutorial({ ...tutorial, name: e.target.value });
  };

  const onChangeemail = (e) => {
    setTutorial({ ...tutorial, email: e.target.value });
  };

  const onChangepassword = (e) => {
    setTutorial({ ...tutorial, password: e.target.value });
  };

  const onChangeConfirmPassword = (event) => {
    setTutorial({ ...tutorial, confirmPassword: event.target.value });
  };

  const handleConfirmBlur = () => {
    if (tutorial.password !== tutorial.confirmPassword) {
      setConfirmErrorState(true);
      setConfirmErrorText("Passwords do not match.");
    } else {
      setConfirmErrorState(false);
      setConfirmErrorText("");
    }
  };

  const handlePasswordBlur = () => {
    if (tutorial.password.trim() !== "") {
      setPasswordErrorState(false);
      setPasswordErrorText("");
    } else {
      setPasswordErrorState(true);
      setPasswordErrorText("Password field cannot be empty.");
    }
  };

  const handleNameBlur = () => {
    if (tutorial.name.trim() !== "") {
      setNameErrorState(false);
      setNameErrorText("");
    } else {
      setNameErrorState(true);
      setNameErrorText("Name field cannot be empty.");
    }
  };

  const handleEmailBlur = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (tutorial.email.trim() !== "" && emailPattern.test(tutorial.email)) {
      setEmailErrorState(false);
      setEmailErrorText("");
    } else {
      setEmailErrorState(true);
      setEmailErrorText("Please enter a valid and non-empty email address.");
    }
  };

  const handleCustomerIdblur = () => {
    const customerId = tutorial.customerId.trim();
    if (/^\d+$/.test(customerId) && customerId.length === 6) {
      setErrorCustomerIdState(false);
      setErrorCustomerIdText("");
    } else {
      setErrorCustomerIdState(true);
      setErrorCustomerIdText(
        "Account Number must be a non-empty sequence of 6 digits."
      );
    }
  };

  const handleBlur = () => {
    const accountNumber = tutorial.accountNumber.trim();
    if (/^\d+$/.test(accountNumber) && accountNumber.length === 10) {
      setErrorState(false);
      setErrorText("");
    } else {
      setErrorState(true);
      setErrorText("Account Number must be a non-empty sequence of 10 digits.");
    }
  };
  
  const saveTutorial = () => {
    const { customerId, accountNumber, name, email, password } = tutorial;

    // First, make an API call to check if data exists in the account database
    axios
      .post(`http://localhost:8083/accounts-api/verify`, {
        "customerID": customerId,
        "accountNumber": accountNumber,
        "customerName": name
      })
      .then((response) => {
        // If the account data exists, proceed to dispatch the createTutorial action
        const accountData = response.data;
        // console.log(response.data);
        // console.log(parseInt(accountNumber) == (accountData.accountNumber), accountNumber, accountData.accountNumber+'');

        if (accountNumber == accountData.accountNumber && name == accountData.customerName) {
          // Dispatch the createTutorial action
          dispatch(
            createTutorial(customerId, name, email, password)
          )
          .then((data) => {
              setTutorial({
                id: data.id,
                customerId: data.customerId,
                accountNumber: accountNumber,
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.password,
              });
              setSubmitted(true);
              console.log(data);

              // After successfully dispatching createTutorial, make a POST request
              // to http://localhost:8081/transactions-api/addCustomer
              axios
                .post(`http://localhost:8083/transactions-api/addCustomer`, {"customerID": customerId})
                .then((response) => {
                  // Handle the response as needed
                  console.log(
                    "POST request to addCustomer successful",
                    response.data
                  );
                  // axios.
                })
                .catch((e) => {
                  console.error("Error making POST request to addCustomer", e);
                });
            })
            .catch((e) => {
              setOpenSnackbar(true);
              setSnackbarMessage("Customer already exists. Please Sign-In");
            });
        } else {
          // Handle the case where data does not exist in the account database
          setOpenSnackbar(true);
          setSnackbarMessage(
            "This is not a NatWest account. Please enter correct Account Number and Customer ID."
          );
        }
      })
      .catch((error) => {
        setOpenSnackbar(true);
        setSnackbarMessage(
          "This is not a NatWest account. Please enter correct Account Number and Customer ID."
        );
      });
  };

  const newTutorial = () => {
    setTutorial({
      id: null,
      customerId: "",
      accountNumber: "",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setSubmitted(false);
  };

  const navigate = useNavigate();
  const navToHome = () => {
    navigate("/")
  }

  const navToLogin = () => {
    navigate("/login");
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <NavbarAdd />
        <Snackbar
          open={openSnackbar} // You should manage this state in your component
          autoHideDuration={6000} // Adjust the duration as needed
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }} // Set the anchor origin
          transformOrigin={{ vertical: "bottom", horizontal: "right" }} // Set the transform origin
        >
          <Alert style={snackbarColor}>{snackbarMessage}</Alert>
        </Snackbar>
        <div style={content} className="submit-form">
          <Grid container>
            {/* Left side */}
            <Grid item xs={12} sm={12} md={6}>
              <Typography style={h1signup} variant="h1">
                Set up Spend2Save
              </Typography>
              <Grid>
                <Typography variant="body1" style={pointsdisplayed}>
                  Setting up Online Banking will only take a few minutes. If we
                  have a mobile number for you, we can set you up for Online
                  Banking more quickly.
                </Typography>
                <br />
                <Typography variant="body1" style={pointsdisplayed}>
                  Before you start, please make sure:
                </Typography>
              </Grid>
              <br />
              <br />
              <Grid>
                <Grid container spacing={2} style={demo}>
                  <VerifiedUserIcon item xs={6} />
                  <Typography
                    item
                    xs={6}
                    variant="body1"
                    style={pointsdisplayed}
                  >
                    You have your account number handy.
                  </Typography>
                </Grid>
                <br />
                <br />
                <Grid container spacing={2} style={demo} alignItems="center">
                  <VerifiedUserIcon style={{ flex: "0 0 auto" }} />
                  <Typography
                    style={{
                      flex: "1",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      ...pointsdisplayed,
                    }}
                    variant="body1"
                  >
                    Make sure you have your customer ID.
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* Right side */}
            <Grid item xs={12} sm={12} md={6}>
              {submitted ? (
                <Grid style={paperStyle}>
                  <Paper
                    elevation={3}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    <h4>Form submitted successfully!</h4>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={newTutorial}
                      className={cancelbutton}
                      style={{ marginRight: "12px" }}
                    >
                      Add Another
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      className={cancelbutton}
                      onClick={navToLogin}
                    >
                      Login
                    </Button>
                  </Paper>
                </Grid>
              ) : (
                <Paper elevation={20} style={paperStyle}>
                  <Grid align="center">
                    <Avatar style={avatarStyle}>
                      <AddCircleOutlineOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Sign Up</h2>
                    <Typography sx={{ fontSize: "1rem" }} variant="caption">
                      Please fill this form to create an account!
                    </Typography>
                  </Grid>
                  <form>
                    {/* Form fields go here */}
                    {/* ... */}
                    <div>
                      <TextField
                        variant="standard"
                        color="secondary"
                        fullWidth
                        label="Customer ID"
                        type="text"
                        className="form-control"
                        placeholder="Enter you Customer ID"
                        value={tutorial.customerId}
                        onChange={onChangeCustomerId}
                        name="accountNumber"
                        onBlur={handleCustomerIdblur}
                        error={errorCustomerIdState}
                      />
                      {errorCustomerIdState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorCustomerIdText}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        variant="standard"
                        color="secondary"
                        fullWidth
                        label="Account Number"
                        type="text"
                        className="form-control"
                        placeholder="Enter you Account Number"
                        value={tutorial.accountNumber}
                        onChange={onChangeaccountNumber}
                        name="accountNumber"
                        onBlur={handleBlur}
                        error={errorState}
                      />
                      {errorState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorText}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        variant="standard"
                        color="secondary"
                        fullWidth
                        label="Full Name"
                        placeholder="Enter your name"
                        type="text"
                        className="form-control"
                        value={tutorial.name}
                        onChange={onChangename}
                        name="name"
                        onBlur={handleNameBlur}
                        error={errorNameState}
                      />
                      {errorNameState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorNameText}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        variant="standard"
                        color="secondary"
                        fullWidth
                        label="E-mail"
                        type="text"
                        className="form-control"
                        placeholder="Enter your Email"
                        value={tutorial.email}
                        onChange={onChangeemail}
                        error={errorEmailState}
                        onBlur={handleEmailBlur}
                        name="email"
                      />
                      {errorEmailState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorEmailText}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        label="Password"
                        variant="standard"
                        color="secondary"
                        fullWidth
                        className="form-control"
                        placeholder="Enter your Password"
                        value={tutorial.password}
                        name="password"
                        onBlur={handlePasswordBlur}
                        error={errorPasswordState}
                        type={showPassword ? "text" : "password"}
                        onChange={onChangepassword}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                              >
                                {showPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errorPasswordState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorPasswordText}
                        </div>
                      )}
                    </div>
                    <div>
                      <TextField
                        label="Confirm Password"
                        variant="standard"
                        color="secondary"
                        fullWidth
                        className="form-control"
                        placeholder="Enter your Password"
                        value={tutorial.confirmPassword}
                        onChange={onChangeConfirmPassword}
                        name="password"
                        onBlur={handleConfirmBlur}
                        error={errorPasswordState}
                        sx={{ paddingBottom: "12px" }}
                        type={showCPassword ? "text" : "password"}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowCPassword}
                                onMouseDown={handleMouseDownCPassword}
                              >
                                {showCPassword ? (
                                  <VisibilityIcon />
                                ) : (
                                  <VisibilityOffIcon />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errorConfirmState && (
                        <div style={{ color: "red", fontSize: "small" }}>
                          {errorConfirmText}
                        </div>
                      )}
                    </div>
                    <div>
                      <Button
                        style={buttonStyle}
                        variant="contained"
                        onClick={saveTutorial}
                        disabled={
                          tutorial.accountNumber.trim() === "" ||
                          tutorial.name.trim() === "" ||
                          tutorial.email.trim() === "" ||
                          tutorial.password.trim() === "" ||
                          tutorial.confirmPassword.trim() === "" ||
                          errorState ||
                          errorNameState ||
                          errorEmailState ||
                          errorPasswordState ||
                          errorConfirmState
                        }
                      >
                        Sign Up
                      </Button>
                    </div>
                    <Grid container spacing={2}>
                      <Button
                        sx={{ color: "#ad1982", marginRight: "auto" }}
                        onClick={navToHome}
                        variant="text"
                      >
                        Cancel
                      </Button>
                      <Typography variant="subtitle1">
                        Already signed up?
                        <Link to="/login">
                          <Button variant="text" sx={{ color: "#ad1982" }}>
                            Login
                          </Button>
                        </Link>
                      </Typography>
                    </Grid>
                  </form>
                </Paper>
              )}
            </Grid>
          </Grid>
        </div>
      </ThemeProvider>
    </>
  );
};

export default AddTutorial;