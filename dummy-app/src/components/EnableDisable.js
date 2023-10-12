import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, TextField, Button, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

function EnableDisable(){
    const navigate = useNavigate();
    const customerID = useSelector((state) => state.customer.customerID);
    const token = useSelector((state) => state.data.token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};
    const [values, setValues] = useState({
        instAccNum:0,
        pin: "",
    });

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const [customerTranInfo, setCustomerTranInfo]=useState({});
    const [customerInfo, setCustomerInfo]=useState({})

    const getCustomerTransaction=async()=>{
        await axios.get(`http://localhost:8083/transactions-api/transactions/${customerID}`, config)
            .then(response => {
                // Check if the status code is in the 200 range
                if (response.status >= 200 && response.status < 300) {
                    setCustomerTranInfo(response.data);;
                    
                } else {
                    setOpenSnackbar(true);
                    setSnackbarMessage(`Request failed with status ${response.status}`);
                }
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage(`Error fetching data: ${error.message}`);
            });
    }

    const getCustomerDetails=async()=>{
        await axios.get(`http://localhost:8083/accounts-api/account/${customerID}`, config)
            .then(response => {
                // Check if the status code is in the 200 range
                if (response.status >= 200 && response.status < 300) {
                    setCustomerInfo(response.data);
                } else {
                    setOpenSnackbar(true);
                    setSnackbarMessage(`Request failed with status ${response.status}`);
                }
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage(`Error fetching data: ${error.message}`);
            });
    }

    useEffect( ()=>{
        getCustomerTransaction();
        getCustomerDetails();
    },[])

    const [errors, setErrors] = useState({});

    function handleCancel(){
        navigate("/home"); // navigate to home page
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validateForm(values);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Form is valid, you can submit it
            
            setOpenSnackbar(true);
            setSnackbarMessage("Submitted successfully");

            if((values.instAccNum===customerID) && (values.pin===customerInfo.password)){
                setOpenSnackbar(true);
                setSnackbarMessage("Verified user");

                let enableStatus;
                if(customerTranInfo.roundUpenabled){
                    enableStatus="true";
                }else{
                    enableStatus="false";
                }
                navigate("/accountBlockage",{
                    state:{
                        formData:values,
                        enabled:customerTranInfo.roundUpenabled
                    }
                })
            }else{
                setOpenSnackbar(true);
                setSnackbarMessage("Please enter correct instant account number or PIN");

                
            }
            
            
    
        } 
        // else {
        //     // Form has errors, display them
        //     alert("Form has errors");
        // }

        

        
        // console.log(values);
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validateForm = (data) => {
        let errors = {};
    
        if (!data.instAccNum.trim()) {
          errors.instAccNum = 'Instant Account Number is required';
        }else if(!(/^\d+$/).test(data.instAccNum)){
            errors.instAccNum='Invalid format, should contain only digits'
        }
    
        if (!data.pin.trim()) {
          errors.pin = 'Pin is required';
        }
        // } else if (!(/^(?=.[A-Za-z])(?=.\d)(?=.[@$!%?&#])[A-Za-z\d@$!%*?&#]{8,20}$/).test(data.pin)) {
        //   errors.pin = 'Invalid PIN format, should contain atleast one digit, small, capital and special character';
        // }
    
        // if (!(data.pin.length>7 && data.pin.length<21)) {
        //   errors.pin = 'Pin must be of length greater than 7 and less than 21';
        // }

        if (data.instAccNum.length!== 6) {
            errors.instAccNum = 'Instant Account Number must be 6 digits only';
          }
  
        return errors;
      };


    return (
        <>
            <Box className="redeemBox1">
                <Box className="redeemBox2">
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ color: "purple", textAlign: "center", mt:2, mb:2, fontWeight: "bolder" }}>
                        Block/Unblock
                    </Typography>

                    
                    <TextField
                        required
                        className="redeemTextField"
                        id="outlined-required"
                        type="text"
                        label="CustomerID"
                        name="instAccNum"
                        onChange={onChange}
                        value={values.amount}
                        sx={{ my: 1, minwidth: 200 }} 
                        />

                    {errors.instAccNum && <Typography fontSize="small" component="p" sx={{my:1, color:"red", fontWeight:"bold"}}>{errors.instAccNum}</Typography>}

                    <TextField
                        required
                        className="redeemTextField"
                        id="outlined-required"
                        type="password"
                        label="PIN"
                        name="pin"
                        onChange={onChange}
                        value={values.pin}
                        sx={{ my: 1, minwidth: 200 }} />

                    {errors.pin && <Typography fontSize="small" component="p" sx={{my:1, color:"red", fontWeight:"bold"}}>{errors.pin}</Typography>}

                    <Stack sx={{ my: 2 }} justifyContent={"center"} direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" sx={{ height: 45, width: 80 }} onClick={handleSubmit} >Submit</Button>
                        <Button variant="outlined" color="secondary" sx={{ height: 45, width: 80 }} onClick={handleCancel}>Cancel</Button>
                    </Stack>
                    
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={()=>setOpenSnackbar(false)}>
                        <Alert onClose={()=>setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>



                </Box>

            </Box>


        </>
    );
}

export default EnableDisable;