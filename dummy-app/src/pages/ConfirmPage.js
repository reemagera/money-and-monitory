import { AppBar, Button, Grid, Tooltip, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { AccountBalanceOutlined, History, Home, PrintOutlined } from "@mui/icons-material";
import TablePay from "../components/TablePay";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";

function ConfirmPage() {
    const location = useLocation();
    const customerID = useSelector((state) => state.customer.customerID);
    const token = useSelector((state) => state.data.token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};
    const payData = location.state.payData;
    const debit = payData.amount;
    let entity;
    if(payData.paymentMethod === "Net Banking") {
        entity = payData.username;
    } else {
        const card = payData.cardNum;
        entity = card.substring(0,4) + "x".repeat(8) + card.substring(12);
    }

    const [transactionID, setTransactionID] = useState(null);

    const handlePrint = () => {
        window.print();
    }

    
    axios.get(`http://localhost:8083/transactions-api/transactions/${customerID}`, config)
    .then((response) => {
        const entry = response.data.transactions.pop();
        setTransactionID(entry.transactionID);

    }).catch((error) => {
        console.log("something went wrong", error);
    }) ;

    return(
        <>
            <AppBar position="static" style={{backgroundColor: '#3c1053'}} className="noPrint">
                <Typography component="h2" variant="h6"
                m={2} align="center">
                    Payment Completion Status
                </Typography>
            </AppBar>
            <Typography variant="h6" component="h2" m={2} align="center"
            className="noPrint">
                Payment Summary
            </Typography>
            <TablePay payData={payData} debit={debit} entity={entity} status="confirm" transactionID={transactionID}/>
            <div className="noPrint">
                <Grid container spacing={2} mt={2} mb={3} justifyContent="center" 
                alignItems="center" >
                    <Grid item>
                        <Tooltip title="View Balance">
                            <Link to="/viewbalance">
                                <Button variant="contained" color="secondary">
                                    <AccountBalanceOutlined/>
                                </Button>
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Home">
                            <Link to="/home">
                                <Button variant="outlined" color="secondary">
                                <Home/>
                                </Button> 
                            </Link>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Print">
                            <Button variant="contained" color="secondary" 
                            onClick={handlePrint}>
                            <PrintOutlined />
                            </Button>  
                        </Tooltip>
                        
                    </Grid>
                    <Grid item>
                        <Tooltip title="Transaction history">
                            <Link to="/transactions">
                                <Button variant="outlined" color="secondary">
                                    <History />
                                </Button> 
                            </Link>
                        </Tooltip>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default ConfirmPage;