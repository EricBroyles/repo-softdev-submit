import * as React from 'react';
import Navbar from "../../components/navigation/navbars/Navbar"
import Footer from "../../components/navigation/footer/Footer"
import LandingCard from '../../components/cards/LandingCard';
//React Router Imports
import {Link,} from 'react-router-dom'
//MUI Imports
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'



//NOTE: image link is not "../../public/img/laptop-coffee.jpeg"
//but rather "/img/laptop-coffee.jpeg"

const Home = () => {
    return(
        <div className= "pages-home">
            <Navbar/>
            <Alert sx={{mt: 8}} severity='info' >
                <Button component={Link} to="/login">
                Join NHS
                </Button>
            </Alert>
            <Box p={5}>
                <Grid container spacing={5}>
                    <Grid item> 
                      <LandingCard 
                        image= "/img/laptop-coffee.jpeg"
                        title="Sponsor an Event" 
                        btnText= "Get NHS Volunteers" 
                        mainText="here is some main text" 
                        contacts="@emil" 
                        route="/get-volunteers"
                    />
                    </Grid>
                    <Grid item> 
                      <LandingCard 
                        image= "/img/laptop-coffee.jpeg"
                        title="Need A Tutor?" 
                        btnText= "Get an NHS tutor" 
                        mainText="here is some main text" 
                        contacts="@emil" 
                        route="/get-tutor"
                    />
                    </Grid>
                    <Grid item>
                        <Paper sx={{ width: 320 }}>
                            <Box p={2}>
                                <Typography variant="h6">
                                    Events
                                </Typography>
                                
                                <Divider/>
                                <Typography>
                                    Upcoming Event 
                                    <Button>
                                        Visit
                                    </Button>
                                </Typography>
                                <Typography>
                                    Recent Event 
                                    <Button>
                                        Visit
                                    </Button>
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Footer/>
        </div>
    )
}

export default Home