import { useNavigate,useLocation } from "react-router";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { AppBar,Button,Typography,Stack} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeEnable, fetchEnableStatus } from "../store/actions";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link } from "react-router-dom";

function ManageBlock(){
    const location=useLocation();
    const navigate=useNavigate();
    const customerID = useSelector((state) => state.customer.customerID);   
    const featureEnabled = useSelector((state) => state.data.status);
    const dispatch = useDispatch();
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const token = useSelector((state) => state.data.token);
    const headers = { 'Authorization': `Bearer ${token}` };
    const config = {headers: headers};

    React.useEffect(() => {
        dispatch(fetchEnableStatus(customerID, token));
    }, [dispatch, customerID, token]);

    function handleConfirm(){
        axios.post(`http://localhost:8083/transactions-api/change-enable-status`, {"customerID": customerID}, {headers: headers}).then(response => {
            if (response.status >= 200 && response.status < 300) {

                setOpenSnackbar(true);
                setSnackbarMessage("You have changed your round up feature enable status, to check changed status please enter details again in enable disable feature form");
                setSuccess(true);
            } else {
                setOpenSnackbar(true);
                setSnackbarMessage(`Request failed with status ${response.status}`);
            }
        }).catch(error => {

            setOpenSnackbar(true);
            setSnackbarMessage(`Error fetching data: ${error.message}`);
        });

        
        axios.get(`http://localhost:8083/transactions-api/transactions/${customerID}`, config)
        .then((response) => {
            dispatch(changeEnable(response.data.roundUpenabled));
        });
        // navigate("/home");
        
    }

    function handleCancel(){
        navigate("/enableDisable");
        
    }

    return(
        <div>
            <AppBar position="static" style={{backgroundColor: '#3c1053',width:"100%"}}>
                <Typography style={{color:"white",width:"100%"}} variant="h5" component="h2" align="center" m={2}>
                    Manage your Instant Account Blockage
                </Typography>
            </AppBar>
            
            <Typography variant="h6" align="center" m={5}>Please confirm the details to manage account blockage.</Typography>

            <TableContainer sx={{mx:"10%",minWidth:250}} component={Paper} style={{textAlign:"center", border:"2px solid black",width:"80%"}}>
                <Table aria-label="simple table" style={{border:3}}>
                    <TableHead>
                        <TableRow style={{backgroundColor:"purple",borderBottom:"2px solid black"}}>
                            
                            <TableCell style={{borderRight:"2px solid black"}} sx={{color:"white"}}  align="left">Fields</TableCell>
                            <TableCell sx={{color:"white"}}  align="center">Details</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {success ? null: (<TableRow style={{borderBottom:"2px solid black"}}>
                            <TableCell style={{borderRight:"2px solid black"}} align="left">Current Roundup feature status</TableCell>
                            <TableCell align="center">{featureEnabled ? "ENABLED" : "DISABLED"}</TableCell>
                        </TableRow>)}
                        <TableRow style={{borderBottom:"2px solid black"}}>
                            <TableCell style={{borderRight:"2px solid black"}} align="left">{success ? "Changed status" : "You want to change it to :"} </TableCell>
                            <TableCell align="center">{!featureEnabled ? "ENABLED" : "DISABLED"}</TableCell>
                        </TableRow>
                        
                        <TableRow>
                            <TableCell style={{borderRight:"2px solid black"}} align="left">CustomerID</TableCell>
                            <TableCell align="center">{location.state.formData.instAccNum}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Stack mt={2} justifyContent={"center"} direction="row" spacing={2}>
                {success ? (<Link to="/home">
                    <Button style={{ height: 50, width: 80 }} variant="contained" color="secondary">Home</Button>
                    </Link>) : (<>
                        <Button style={{ height: 50, width: 80 }} variant="contained" color="secondary" onClick={handleConfirm}>Confirm</Button>
                <Button style={{height:50,width:80}} variant="outlined" color="secondary" onClick={handleCancel}>Cancel</Button>
                    </>)}
                
            </Stack>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="info" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>


        </div>
    )


}

export default ManageBlock;