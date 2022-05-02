import Navbar from "../../components/navigation/navbars/Navbar"
import Footer from "../../components/navigation/footer/Footer"
import GetVolunteersForm from "../../components/forms/steppers/GetVolunteersForm"


import Grid from '@mui/material/Grid';

const GetVolunteers = () => {
    return(
        <Grid container direction="column"spacing={4}>
            <Grid item>
                <Navbar/>
            </Grid>
            <Grid item>
                <GetVolunteersForm/>
            </Grid>
            <Grid item>
                <Footer/>
            </Grid>
        </Grid>
            
            
            
            
            
       
    )
}

export default GetVolunteers