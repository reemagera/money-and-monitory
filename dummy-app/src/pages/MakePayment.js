import { Alert, AppBar, Box, Button, Checkbox, Container, FormControlLabel,
    Grid, Radio, RadioGroup, Snackbar, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NetBankForm from "../components/NetBankForm";
import CardForm from "../components/CardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails, fetchEnableStatus } from "../store/actions";

function MakePayment() {

    const customerID = useSelector((state) => state.customer.customerID);
    const token = useSelector((state) => state.data.token);
    const account = useSelector((state) => state.data.account);
    const status = useSelector((state) => state.data.status);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAccountDetails(customerID, token));
        dispatch(fetchEnableStatus(customerID, token));
    }, [dispatch, customerID, token])

    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [disableproceed, setDisableProceed] = useState(true);
    const [transactData, setTransactData] = useState({
        "account": null,
        "amount": null,
        "paymentMethod": null,
        "username": null,
        "password": null,
        "accept": null
    });
    const [amount, setAmount] = useState();
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center'
    })

    const {vertical, horizontal, open} = state;
    const [errorMsg, setErrorMsg] = useState("");

    const handlePaymentMethod = (event) => {
        setPaymentMethod(event.target.value);
    }

    const handleClose = () => {
        setState({...state, open: false});
    }

    function handlePayment(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (amount > 0) {
            if (paymentMethod === "netbanking") {
                if (account.netBanking === data.get("username") && account.password === data.get("password")) {
                    setTransactData({
                        "account": data.get("account"),
                        "amount": amount,
                        "type": "debit",
                        "paymentMethod": "Net Banking",
                        "username": data.get("username"),
                        "password": data.get("password"),
                        "accept": data.get("accept")
                    });
                    setDisableProceed(false);
                } else {
                    setErrorMsg("Invalid credentials");
                    setState({...state, open: true});
                    
                }
                
            } else if (paymentMethod === "card" && data.get("cardNum").length === 16) {
                if (String(account.debitCardNumber) === data.get("cardNum") && account.cvv === parseInt(data.get("cvv"))
                && account.expiryMonth === data.get("month") && account.expiryYear === data.get("year")) {
                    setTransactData({
                        "account": data.get("account"),
                        "amount": amount,
                        "type": "debit",
                        "paymentMethod": "Card",
                        "cardNum": data.get("cardNum"),
                        "month": data.get("month"),
                        "year": data.get("year"),
                        "cvv": data.get("password"),
                        "accept": data.get("accept")
                    });
                    setDisableProceed(false);
                } else {
                    setErrorMsg("Inavlid card details");
                    setState({...state, open: true});
                }
                
            } 
        }
    }

    function redirectToPreview() {
        navigate("/previewpay", {
            state: {
                payData: transactData
            }
        })
    }

    function handleAmountChange(event) {
        const val = event.target.value;
        if (val > 0) { 
            setAmount(val);
        } else {
            setAmount("");
        }

    }

    if (!status) {
        return(
            <>
                <AppBar position="static" style={{backgroundColor: '#3c1053'}}>
                    <Container>
                        <Typography variant="h5" component="h2" align="center" m={3}>
                            Spend2Save Payment Interface
                        </Typography>
                    </Container>
                </AppBar> 
                <Typography align="center" variant="h6" component="h3" m={5}>
                    Dear customer, you cannot perform payments in Spend2Save since you disabled this feature.
                    Please go to home, then enable status to perform transactions.
                    You may still use NWG netBanking without roundUps.
                </Typography>
                <Container>
                    <Link to="/home">
                        <Button variant="outlined" color="secondary" style={{marginLeft: '10px'}}>Go back to Home</Button>
                        </Link>
                </Container>
            </>
        )
    }

    return(
        <>
            {/* <AccountDetails/> */}
            <AppBar position="static" style={{backgroundColor: '#3c1053'}}>
                <Container>
                    <Typography variant="h5" component="h2" align="center" m={3}>
                        Spend2Save Payment Interface
                    </Typography>
                </Container>
            </AppBar> 
            <Typography align="center" variant="h6" component="h3" m={5}>
                Dear customer, Please enter the details carefully and 
                follow the prompts to complete your payment transaction.
            </Typography>
            <Container >
                <Snackbar anchorOrigin={{vertical, horizontal}} autoHideDuration={6000} open={open} onClose={handleClose} 
                     key={vertical+horizontal}>
                        <Alert severity="error">
                            {errorMsg}
                        </Alert>
                    </Snackbar>
                <Box component="form" onSubmit={handlePayment} className="customContainer">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField variant="outlined" name="account" required
                            label="Recepient's bank account" 
                            type="number" id="account"
                            placeholder="Recepient's account number" fullWidth/>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField variant="outlined" label="Amount" required
                            type="number" name="amount" id="amount" value={amount}
                            placeholder="Amount to be transferred" onChange={handleAmountChange}
                            fullWidth inputProps={{step: "any", min: 0}}/>
                        </Grid>
                        <Grid item xs={12} md={5} mt={2}>
                            <RadioGroup row name="paymentMethod" aria-required="true"
                            value={paymentMethod} onChange={handlePaymentMethod}>
                                <FormControlLabel value="netbanking" 
                                control={<Radio color="secondary" required/>} 
                                label="Proceed with NetBanking" />
                                <FormControlLabel value="card" 
                                control={<Radio color="secondary"/>} 
                                label="Pay with card" required/>
                            </RadioGroup>
                        </Grid>
                        <Grid item md={12} xs={12} mb={1}>
                            { paymentMethod === "netbanking" ? (
                                <NetBankForm/>
                            ) : paymentMethod === "card" ? (
                                <CardForm/>
                            ) : null }
                        </Grid>
                        <Grid item md={12} mt={2}>
                            <FormControlLabel required name="accept"
                            control={<Checkbox color="secondary"/>} 
                            label="I understand that upon proceeding further 
                            and confirming, money would be deducted from my 
                            account." />
                        </Grid>
                        <Grid item md={2}>
                            <Button color="secondary" variant="outlined" type="submit">Verify</Button>
                        </Grid>
                        <Grid item md={2}>
                            <Button color="secondary" variant="contained" disabled={disableproceed} onClick={redirectToPreview}>Proceed</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Link to="/home"><Button variant="outlined" color="secondary" style={{marginLeft: '10px'}}>Go back to Home</Button></Link>
            </Container>
        </>
    )
}

export default MakePayment;