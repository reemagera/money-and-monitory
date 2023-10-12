import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import herounitimg from '../images/herounit.jpg';

function HeroUnit(props) {
    return(
        <Paper style={{
                padding: '2rem',
                backgroundColor: '#5a287d',
                textAlign: 'center',
            }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={9}>
                    <Typography variant="h4" component="div" color="white" gutterBottom>
                        Save as you spend!
                    </Typography>
                    <Typography variant="subtitle1" color="lightgrey" m={2}>
                        Save every penny upon your transactions. <br/>Let's develop the habit of saving with Spend2Save. <br/>Access your savings buddy anytime!
                    </Typography>
                    <Button style={{
                            backgroundColor: 'white', 
                            color: '#3c1053', 
                            borderRadius: '50px',
                            padding: '10px 30px',
                            width: 'fit-content'}}
                            onClick={props.handleClick}>
                                Learn More
                    </Button>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <img src={herounitimg} alt='a woman sitting in a cafe' style={{width: '100%', height: 'auto', borderRadius: '15px', objectFit: 'cover'}}/>
                </Grid>
            </Grid>
                
        </Paper>
    )
}

export default HeroUnit;