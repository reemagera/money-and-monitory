import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Box, TextField, Button, Typography, Stack, Tooltip, InputAdornment } from "@mui/material";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";



function Redeem() {

    const customerID = useSelector((state) => state.customer.customerID);
    const account = useSelector((state) => state.data.account);
    const token = useSelector((state) => state.data.token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        getCustomerTransaction();
        getCustomerDetails();
    }, []);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        amount:"",
        pin: "",
    });

    // const currentBalance = account.currentBalance;
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [currentBalance,setCurrentBalance]=useState(0);
    const [customerTranInfo, setCustomerTranInfo]=useState({});
    const [customerInfo, setCustomerInfo]=useState({})

    const getCustomerDetails=async()=>{
        
       await axios.get(`http://localhost:8083/accounts-api/account/${customerID}`, config)
            .then(response => {
                // Check if the status code is in the 200 range
                if (response.status >= 200 && response.status < 300) {
                    setCustomerInfo(response.data);
                    setCurrentBalance(response.data.accountBalance);
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

    

    function handleBalance(){
        navigate("/viewbalance"); //navigate to view balance
    }

    function handleCancel(){
        navigate("/home"); // navigate to home page
    }

    const [errors, setErrors] = useState({});
    
    

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        

        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = validateForm(values);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Form is valid, you can submit it
            
            setOpenSnackbar(true);
            setSnackbarMessage("Submitted successfully");

            if((values.pin===account.password)){
                if(values.amount>customerTranInfo.roundUpBalance){
                    
                    setOpenSnackbar(true);
                    setSnackbarMessage("Insufficient balance to perform redemption");
                    
                }else{
                    let data={
                
                        "type":"credit",
                        "method":"redeem",
                        "amount":values.amount,
                        "roundUp":0.0,
                        "currentBalance":currentBalance,
                        "toOrFrom":"instantSavings",
                        
                    }

                    let updatedBalance = parseFloat(currentBalance)+parseFloat(values.amount);
                    console.log(updatedBalance);
                    axios.post(`http://localhost:8083/transactions-api/transactions/${customerID}`, data, config)
                    .then(response => {
                        if (response.status >= 200 && response.status < 300) {
                            axios.post(`http://localhost:8083/accounts-api/account/${customerID}`, {"accountBalance":updatedBalance}, config)
                            .then(response => {
                                if (response.status >= 200 && response.status < 300) {
                                   
                                    setOpenSnackbar(true);
                                    setSnackbarMessage("Redemption successful");
                                    setSuccess(true);
                                } else {
                                    setOpenSnackbar(true);
                                    setSnackbarMessage(`Request failed with status ${response.status}`);
                                }
                            }).catch(error => {
                               
                                    setOpenSnackbar(true);
                                    setSnackbarMessage(`Error fetching data: ${error.message}`);
                              });
                        
                            


                        } else {
                            setOpenSnackbar(true);
                            setSnackbarMessage(`Request failed with status ${response.status}`);

                        }
                    }).catch(error => {
                        setOpenSnackbar(true);
                        setSnackbarMessage(`Error fetching data: ${error.message}`);
                    });
                    
    
                }

            }else{
                
                setOpenSnackbar(true);
                setSnackbarMessage("Enter your netbanking password properly");
            }
            
    
        } 
    };

    const validateForm = (data) => {
        let errors = {};
    
        if (!data.amount.trim()) {
          errors.amount = 'Amount is required';
        }else if(!(data.amount>0 && data.amount<100)){
            errors.amount='Amount should be greater than 0 and less than 99'
        }
    
  
        return errors;
      };

    if (success) {
        return(
            <Box className="redeemBox1">
                <Box className="redeemBox2">
                    <Typography variant="h5" component="h2" sx={{ color: "purple", textAlign: "center", mt:2, mb:2, fontWeight: "bolder" }}>
                        Redemtion successful
                    </Typography>
                    <Stack sx={{ my: 2 }} justifyContent={"center"} direction="row" spacing={2}>
                        <Button variant="outlined" color="secondary" sx={{ height: 45, width: 80 }} onClick={handleCancel}>Home</Button>
                        
                        <Tooltip title="View Balance">
                            <Button style={{ height: 45, width: 80 }} variant="contained" color="secondary" onClick={handleBalance}><AccountBalanceWalletIcon /></Button>
                        </Tooltip>
                        
                    </Stack>
                    
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={()=>setOpenSnackbar(false)}>
                        <Alert onClose={()=>setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
        )
    }

    return (
        <>
            <Box className="redeemBox1">
                <Box className="redeemBox2">
                    <Typography
                        variant="h5"
                        component="h2"
                        sx={{ color: "purple", textAlign: "center", mt:2, mb:2, fontWeight: "bolder" }}>
                        Redeem savings
                    </Typography>

                    
                    <TextField
                        required
                        className="redeemTextField"
                        id="outlined-required"
                        type="number"
                        label="Amount"
                        name="amount"
                        onChange={onChange}
                        value={values.amount}
                        sx={{ my: 1, minwidth: 200 }}
                        InputProps={{
                            startAdorment: <InputAdornment position="start">£</InputAdornment>
                        }}
                        />

                    {errors.amount && <Typography fontSize="small" component="p" sx={{my:1, color:"red", fontWeight:"bold"}}>{errors.amount}</Typography>}

                    

                    <TextField
                        required
                        className="redeemTextField"
                        id="outlined-required"
                        type="password"
                        label="PIN"
                        name="pin"
                        onChange={onChange}
                        value={values.pin}
                        sx={{ my: 1, minwidth: 200 }}
                         />

                    {errors.pin && <Typography fontSize="small" component="p" sx={{my:1, color:"red", fontWeight:"bold"}}>{errors.pin}</Typography>}

                    <Stack sx={{ my: 2 }} justifyContent={"center"} direction="row" spacing={2}>
                        <Button variant="contained" color="secondary" sx={{ height: 45, width: 80 }} onClick={handleSubmit} >Redeem</Button>
                        <Button variant="outlined" color="secondary" sx={{ height: 45, width: 80 }} onClick={handleCancel}>Cancel</Button>
                        
                        <Tooltip title="View Balance">
                            <Button style={{ height: 45, width: 80 }} variant="contained" color="secondary" onClick={handleBalance}><AccountBalanceWalletIcon /></Button>
                        </Tooltip>
                        
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

export default Redeem;