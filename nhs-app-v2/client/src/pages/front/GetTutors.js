import Navbar from "../../components/navigation/navbars/Navbar"
import Footer from "../../components/navigation/footer/Footer"
import GetTutorForm from "../../components/forms/steppers/GetTutorForm"
import Grid from '@mui/material/Grid';
const GetTutor = () => {
    return(
        <Grid container direction="column"spacing={4}>
        <Grid item>
            <Navbar/>
        </Grid>
        <Grid item>
            <GetTutorForm/>
        </Grid>
        <Grid item>
            <Footer/>
        </Grid>
    </Grid>

        
    )
}

export default GetTutor