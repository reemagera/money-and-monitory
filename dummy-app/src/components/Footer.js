import { FacebookOutlined, GavelOutlined, HelpOutline, Instagram, LibraryBooksOutlined, LinkedIn, MailOutline, Map, PhoneOutlined, PolicyOutlined, Twitter, WhatsApp } from "@mui/icons-material";
import { AppBar, Container, Grid, List, ListItem, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Footer() {
    return(
        <AppBar position="static" style={{backgroundColor: '#3c1053', paddingTop: '75px'}}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item m={2}>
                        <Typography variant="h6" component="div" className="customText">
                            <HelpOutline className="customIcon"/> Customer Care                            
                        </Typography>
                        <List>
                            <ListItem>
                                <Typography component="a" href="/" className="customLink customText">
                                    <MailOutline className="customIcon"/> spend2save@natwest.com
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography className="customText">
                                    <PhoneOutlined className="customIcon"/> 1800-xxxx-xxxx
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component="a" href="/" className="customLink customText">
                                    <Map className="customIcon" /> Postal address: Edinburg
                                </Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item m={2}>
                        <Typography variant="h6" className="customText">
                            <GavelOutlined className="customIcon" /> Terms & Conditions, Policies
                        </Typography>
                        <List>
                            <ListItem>
                                <Typography component="a" href="/" className="customLink customText">
                                    <LibraryBooksOutlined className="customIcon" /> Terms and Conditions
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component="a" href="/" className="customLink customText">
                                    <PolicyOutlined className="customIcon" /> Policy
                                </Typography>
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item m={2}>
                        <Typography variant="h6" mb={1}>
                            Socials
                        </Typography>
                        <Link to="/" className="customLink"><MailOutline className="circleBound customIcon"/></Link>
                        <Link to="/" className="customLink"><FacebookOutlined className="circleBound customIcon"/></Link>
                        <Link to="/" className="customLink"><Instagram className="circleBound customIcon" /></Link>
                        <Link to="/" className="customLink"><Twitter className="circleBound customIcon" /></Link>
                        <Link to="/" className="customLink"><WhatsApp className="circleBound customIcon" /></Link>
                        <Link to="/" className="customLink"><LinkedIn className="circleBound customIcon" /></Link>
                    </Grid>
                </Grid>
            </Container>
        </AppBar>
    )
}
export default Footer;