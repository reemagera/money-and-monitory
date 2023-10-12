import { AccountBalanceOutlined, HistoryOutlined, LogoutOutlined, PaymentOutlined, SavingsOutlined, SupportAgentOutlined, ToggleOffOutlined } from "@mui/icons-material";
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Grid, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchAccountDetails, fetchEnableStatus, setCustomer, setToken } from "../store/actions";
import { useEffect, useRef } from "react";
// import axios from "axios";

function Home() {

    const customerID = useSelector((state) => state.customer.customerID);
    const token = useSelector((state) => state.data.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    useEffect(() => {
        dispatch(fetchEnableStatus(customerID, token));
        dispatch(fetchAccountDetails(customerID, token));
    }, [dispatch, customerID, token])

    const account = useSelector((state) => state.data.account);
    const status = useSelector((state) => state.data.status);

    const footerRef = useRef();
    function scrollToFooter() {
        footerRef.current.scrollIntoView({behavior: "smooth"});
    }

    function navToTransact() {
        navigate("/pay")
    }

    function navToHistory() {
        navigate("/transactions");
    }

    function navToRedeem() {
        navigate("/redeem");
    }

    function navToEnableDisable() {
        navigate("/enableDisable")
    }

    function handleLogout() {
        dispatch(setCustomer(null));
        dispatch(setToken(null));
        navigate("/")
    }

    function navToViewBalance() {
        navigate("/viewbalance");
    }

    return(
        <>
            <AppBar position="static" component="nav" style={{backgroundColor: '#3c1053'}} >
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <Typography variant="h6" div="div">
                        Spend2Save
                    </Typography>
                    <Box>
                        <Button style={{color: 'white'}} disabled>
                            Status: {status ? "Enabled" : "Disabled"}
                        </Button>
                        <Button style={{backgroundColor: '#3c1053', 
                        border: '1px solid white', 
                        borderRadius: '50px', 
                        color: 'white', 
                        padding: '5px 15px',
                        fontSize: 'small'}} onClick={handleLogout}>
                            <LogoutOutlined/> Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container style={{marginBottom: '50px', marginTop: '20px'}}>
                <Typography variant="h6" fontWeight="bold" component="h1">
                    Welcome {account !=null ? account.customerName : null}! 
                </Typography>
                <Grid container spacing={2} >
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={navToTransact} 
                            className="customCard" 
                            style={{backgroundColor: 'lightgreen'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <PaymentOutlined className="customIcon" fontSize="large" />Make payment
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Make debit transactions using NetBanking or using
                                        Debit/credit card linked to your account.
                                        Click here to get started.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={navToRedeem} className="customCard"
                            style={{backgroundColor: 'lightyellow'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <SavingsOutlined className="customIcon" fontSize="large" />Redeem Savings
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Redeem your 'Round Up Savings' from
                                        Instant Savings Account into your
                                        existing bank account at anytime.
                                        Click here to redeem.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={navToHistory} className="customCard" 
                            style={{backgroundColor: 'lightgray'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <HistoryOutlined className="customIcon" fontSize="large" />
                                        Transaction History
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Track the status of your accounts easily.
                                        View all the transactions performed by you 
                                        in Spend2Save. Click here to View.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={navToViewBalance} className="customCard"
                            style={{backgroundColor: 'lightblue'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <AccountBalanceOutlined className="customIcon" fontSize="large" />
                                        View Balance
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        View Balance of your accounts easily.
                                        Click here to check balance in your bank account using your
                                        pin and username credentials.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={navToEnableDisable}  className="customCard"
                            style={{backgroundColor: 'lightpink'}}>
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <ToggleOffOutlined className="customIcon" fontSize="large" />Enable / Disable
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Click Here to enable / disable 'Spend2Save'
                                        feature. This will correspondingly
                                        affect active status of your instant savings account.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardActionArea onClick={scrollToFooter}
                            style={{backgroundColor: 'skyblue'}} 
                            className="customCard">
                                <CardContent>
                                    <Typography variant="h6" component="div" className="customText">
                                        <SupportAgentOutlined className="customIcon" fontSize="large" />
                                        Need Support?
                                    </Typography>
                                    <Typography variant="body" color="text.secondary">
                                        Need support or any help regarding
                                        'Spend2Save'? If you have any questions
                                        Email or call our customer care. Click here
                                        for details.
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <div ref={footerRef}>
            <Footer />

            </div>
        </>
    )
}

export default Home;