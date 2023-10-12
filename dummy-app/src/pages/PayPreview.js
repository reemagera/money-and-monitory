import { Alert, AppBar, Button, Grid, Snackbar, Tooltip, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { HelpOutline } from "@mui/icons-material";
import TablePay from "../components/TablePay";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails } from "../store/actions";
import { useEffect } from "react";
import { useState } from "react";

function PayPreview() {
    const customerID = useSelector((state) => state.customer.customerID);
    const token = useSelector((state) => state.data.token);
    const account = useSelector((state) => state.data.account);
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};
    const dispatch = useDispatch();
    const [message, setMessage] = useState(null);

    useEffect(() => {
        dispatch(fetchAccountDetails(customerID, token));
    }, [dispatch, customerID, token]);

    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    })

    const {vertical, horizontal, open} = state;
    const handleClose = () => {
        setState({...state, open: false});
    }

    const navigate = useNavigate();
    const location = useLocation();
    const myData = location.state.payData;
    const debit = myData.amount;
    let entity;
    if(myData.paymentMethod === "Net Banking") {
        entity = myData.username;
    } else {
        const card = myData.cardNum;
        entity = card.substring(0,4) + "x".repeat(8) + card.substring(12);
    }

    function handleCancel() {
        navigate("/pay");
    }

    function handleConfirm() {
        axios.post(`http://localhost:8083/accounts-api/account/${customerID}`, {"accountBalance": account.accountBalance-Math.ceil(debit)}, config)
        .then((response) => {
            // console.log(response.status)
            if (response.status === 200) {
                axios.post(`http://localhost:8083/transactions-api/transactions/${customerID}`, {
                    "type": myData.type,
                    "method": myData.paymentMethod,
                    "amount": Math.ceil(debit),
                    "roundUp":(Math.ceil(debit) - debit).toFixed(2),
                    "currentBalance": account.accountBalance,
                    "toOrFrom": myData.account
                }, config)
                .then((response2) => {
                    if (response2.status === 200) {
                        navigate("/payment-done", {
                            state: {
                                payData: myData
                            }
                        })
                    } else {
                        setMessage("Permission denied");
                        setState({...state, open: true});
                    }
                    
                })
                .catch((error2) => {
                    console.error(error2);
                    setMessage("Could not push transaction: Balance insufficient");
                    setState({...state, open: true});
                })
                
            } else {
                setMessage("something is wrong");
                setState({...state, open:true});

            }
        }).catch((error) => {
            console.error("Error making transaction:", error);
            setState({...state, open:true});
            setMessage("Insufficient balance");
        });
        // navigate("/payment-done", {
        //     state: {
        //         payData: myData
        //     }
        // })
        
    }

    const longText = `Upon clicking on confirm, your payment will be
    completed, Upon clicking on 'Cancel', you will
    be directed to the payment Interface. You will 
    have to start the process afresh.`
    return(
        <>
            <AppBar position="static" style={{backgroundColor: '#3c1053'}}>
                <Typography variant="h5" component="h2" align="center" m={2}>
                    Payment Preview
                </Typography>
            </AppBar>
            <Snackbar anchorOrigin={{vertical, horizontal}} autoHideDuration={6000} open={open} onClose={handleClose} 
                     key={vertical+horizontal}>
                        <Alert severity="error">
                            {message}
                        </Alert>
                    </Snackbar>
            <Typography variant="h6" align="center" m={5}>Please confirm the transaction details to complete.</Typography>
            <TablePay payData={myData} debit={debit} entity={entity} status="preview"/>

            <Grid container mt={2} mb={1}>
                <Grid item xs={12} md={12}>
                    <Typography variant="h6" component="div" 
                    align="center" className="customText" 
                    justifyContent="center" 
                    alignItems="center">
                        Confirm the details to complete transaction 
                        <Tooltip title = {longText}>
                            <HelpOutline />
                        </Tooltip>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item>
                    <Button variant="contained" color="secondary"
                    onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary"
                    onClick={handleCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default PayPreview;