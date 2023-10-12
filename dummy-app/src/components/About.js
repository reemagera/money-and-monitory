import { AssignmentIndOutlined, CheckOutlined, ClearOutlined, HowToRegOutlined, LoginOutlined, PowerSettingsNewOutlined } from "@mui/icons-material";
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator, timelineItemClasses } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, styled, TableCell, tableCellClasses, TableBody, Typography, Grid, Container } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#3c1053",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(feature, withPlan, without) {
    return {feature, withPlan, without}
}

const rows = [
    createData('Instant Savings', <p><CheckOutlined color="success"/></p> , <p><ClearOutlined color="error"/></p>),
    createData('Redeem Savings', <p><CheckOutlined color="success"/></p>, <p><ClearOutlined color="error"/></p>),
    createData('Round Up Transactions', <p><CheckOutlined color="success"/></p>, <p><ClearOutlined color="error"/></p>),
    createData('View balance', <p><CheckOutlined color="success"/></p>, <p><CheckOutlined color="success"/></p>),
    createData('Transaction history', <p><CheckOutlined color="success"/></p>, <p><CheckOutlined color="success"/></p>),
]

const steps = [
    {logo: <AssignmentIndOutlined/>, step: 'Step 1', description: 'Ensure that you have an existing bank account with NWG bank. Make sure you are an existing customer' },
    {logo: <LoginOutlined/>, step: 'Sign up', description: 'Go to the sign up page and fill in your bank account and customer details to avail the plan and open and instant savings account.'},
    {logo: <PowerSettingsNewOutlined/>, step: 'Login', description: 'Login with your credentials. Your credentials be verified and you will be directed to the home page and you can access the features of Spend2Save.'},
]

function About() {
    return(
        <Container>
            <Grid container spacing={3} sx={{mt:3, mb:3}}>
                <Grid item xs={12} md={6}>
                    <div className="centerDiv">
                        <Typography variant="h5" component="div" align="center" m={2}>
                            Why you should sign up!
                        </Typography>
                        <TableContainer component={Paper} sx={{width: '80%'}} >
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Feature</StyledTableCell>
                                        <StyledTableCell align="center">With Spend2Save</StyledTableCell>
                                        <StyledTableCell align="center">Without Spend2Save</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map(row => (
                                        <StyledTableRow key={row.feature}>
                                            <StyledTableCell component="th" scope="row">
                                                {row.feature}
                                            </StyledTableCell>
                                            <StyledTableCell align="center" component="th" scope="row">
                                                {row.withPlan}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{row.without}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <div className="centerDiv" >
                        <Typography variant="h5" component="div" m={2}>
                            How to I join?
                        </Typography>
                    </div>
                    <Timeline sx={{
                        [`& .${timelineItemClasses.root}:before`]: {
                        flex: 0,
                        padding: 0,
                        }}}>
                        {steps.map((myStep) => (
                            <TimelineItem key={myStep.step}>
                                <TimelineSeparator>
                                    <TimelineDot style={{backgroundColor: "#3c1053"}}>{myStep.logo}</TimelineDot>
                                    <TimelineConnector/>
                                </TimelineSeparator>
                                <TimelineContent>
                                    <h4>{myStep.step}</h4>
                                    <p>{myStep.description}</p>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                        <TimelineItem>
                            <TimelineSeparator>
                                <TimelineDot color="success">
                                    <HowToRegOutlined/>
                                </TimelineDot>
                            </TimelineSeparator>
                            <TimelineContent>
                                <h4>Good to go!</h4>
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                </Grid>
            </Grid>
        </Container>
        
    )
}
export default About;