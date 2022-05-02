import ScheduleCard from "../../../components/cards/ScheduleCard"

import AnnouncementTag from "../../../components/helper/AnnouncementTag"

import MockDatabase from "../../../MockDatabase"
//MUI Imports
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'


const Schedule = () => {
    //type,times, location, names, contacts, must be given a value
   const scheduleCards = MockDatabase("userSchedule")
        
    


    //mt is short for margin top
    return(
        <div className = "Schedule">
            
            <AnnouncementTag/>
            <Box p={5} >
                <Grid container spacing={5}>
                    {scheduleCards.map((scheduleCard, i) => {
                        return (
                            <Grid item key={i}> 
                                <ScheduleCard  {...scheduleCard}/>
                            </Grid>
                        )})}
                </Grid>
            </Box>
            
        </div>
    )
}

export default Schedule