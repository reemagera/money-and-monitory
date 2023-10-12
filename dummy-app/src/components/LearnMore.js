import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, List, ListItem, Typography } from "@mui/material";
import { useState } from "react";
import login from '../images/login.jpg';
import transact from '../images/transaction.jpg';
import debit from '../images/extradebit.jpg';
import credit from '../images/CreditCard.jpeg';
import saving from '../images/herounit.jpg';

const steps = [
    {id: 1, summary: "Login to 'Spend2Save'", details: "To log in, go to the application's login page, enter your username or email and password, then click the 'Login' button. Successful authentication grants access to your account, where you can use the application's features.", displayImg: login},
    {id: 2, summary: "Make a transaction", details: "Make a transaction using your existing bank account in 'Spend2Save' home page. Upon transaction, amount will be debited from your account. The debited amount will include your transaction amount and the 'extra credit'", displayImg: transact},
    {id: 3, summary: "Extra debited on each transaction", details: "Let's say you have performed a transaction for 4.5 pounds, in this case the actual money debited will be 5 pounds (rounded off), the extra 0.5 pounds debited will be the extra credit (round up savings)", displayImg: debit},
    {id: 4, summary: "Round up savings", details: "Every time you perform a transaction, the 'round up savings' will be credited to your 'instant savings account' in 'Spend2Save'", displayImg: credit},
    {id: 5, summary: "Redeem savings", details: "You can redeem your savings from your 'instant savings account' back into your existing account when there is more than 1 pound balance in instant savings account.", displayImg: saving},

]
function LearnMore() {
    const [stepImg, setStepImg] = useState(steps[0]);

    function handleClick(key) {
        setStepImg(steps[key-1]);
    }
    
    return(
        <Container sx={{mb:5}}>
            <Typography variant="h5" align="center" sx={{mt:4, mb:2}}>How Does this plan work?</Typography>
            <Grid container spacing={1} m={1} className="centerDiv">
                <Grid item xs={12} sm={6} sx={{mt:1, mr: 5}}>
                    <List>
                        {steps.map((step) => (
                            <ListItem className="customList" key={step.id} onClick={() => handleClick(step.id)}>
                                <Typography variant="button" display="block" >{step.summary}</Typography>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} sm={5} sx={{mt:3}}>
                    <Card>
                        <CardActionArea>
                            <CardMedia component="img" image={stepImg.displayImg}
                            alt="corresponding step" className="customImage"/>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {stepImg.details}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LearnMore;