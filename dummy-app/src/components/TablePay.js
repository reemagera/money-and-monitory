import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { StyledTableCell, StyledTableRow } from "./About";
import { CurrencyPound } from "@mui/icons-material";

function TablePay({payData, entity, debit, status, transactionID }) {
    return(
        <TableContainer component={Paper} style={{width: '80%'}} className="centerSelf">
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell >Field</StyledTableCell>
                            <StyledTableCell >Your Details</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {status === "confirm" ? 
                        (<StyledTableRow>
                            <StyledTableCell component="th" scope="row">Transaction ID</StyledTableCell>
                            <StyledTableCell>{transactionID !=null ? transactionID : "failure"}</StyledTableCell>
                        </StyledTableRow>) : (null) }
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">Recepient Bank Account</StyledTableCell>
                            <StyledTableCell>{payData.account}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Payment Type</StyledTableCell>
                            <StyledTableCell>{payData.paymentMethod}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Transferred using</StyledTableCell>
                            <StyledTableCell>{entity}</StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Amount</StyledTableCell>
                            <StyledTableCell> 
                                <Typography variant="p" className="customText">
                                    {debit} <CurrencyPound/>
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Round Up Debited (Transferred to Instant Savings Account)</StyledTableCell>
                            <StyledTableCell className="customText">
                                <Typography variant="p" className="customText">
                                    {(Math.ceil(debit) - debit).toFixed(2)} <CurrencyPound/>
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                        <StyledTableRow>
                            <StyledTableCell>Total debit</StyledTableCell>
                            <StyledTableCell>
                                <Typography className="customText">
                                   {Math.ceil(debit)} <CurrencyPound/> 
                                </Typography>
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default TablePay;