//
import React from 'react';
import SponsorDetailsStep from "../steps/volunteers/SponsorDetailsStep"
import EventDetailsStep from "../steps/volunteers/EventDetailsStep"
import EventCommentStep from "../steps/CommentStep"
import EventTitleStep from "../steps/volunteers/EventTitleStep"
import CreateEventModal from '../../modals/CreateEventModal';
//react-router-dom
import {Link} from 'react-router-dom'
//MUI Imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Stack from '@mui/material/Stack';
//Icons
import VolunteerIcon from '@mui/icons-material/VolunteerActivism';
//token



const GetVolunteersForm = () => {

const [activeStep, setActiveStep] = React.useState(0);
const [openModal, setOpenModal] = React.useState(false);
const [disableCont, setDisableCont] = React.useState(true)

//to be added to nhsdb --Schedule
const [data, setData] = React.useState({
    eventKeys: [], 
    sponsorKeys: [],
    type: "event",
    title: null,
    names: [],
    emails: [],
    tutoringSubjects: [],
    tutoringTypes: [],
    comment: null,
    link: null,
    beginTimes:  [],
    endTimes: [],
    membersSigned: null,
    numSpots: [],
    approved: null,
    phones: [],
    dates: [],
    locations: [],
    requestedTutors: [],
})
React.useEffect(() => {
    if(activeStep === 0 && data.sponsorKeys.length !== 0){
        setDisableCont(false)
    }else if(activeStep === 1 && data.title !== null){
        
        setDisableCont(false)
    }else if(activeStep === 2 && data.eventKeys.length !== 0){
        setDisableCont(false)
    }else{
        setDisableCont(true)
    }
},[data, activeStep])

const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);    
};
const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
};
const handleReset = () => {
    setActiveStep(0);
    setData({
        eventKeys: [], 
        sponsorKeys: [],
        type: "event",
        title: null,
        names: [],
        emails: [],
        tutoringSubjects: [],
        tutoringTypes: [],
        comment: null,
        link: null,
        beginTimes:  [],
        endTimes: [],
        membersSigned: null,
        numSpots: [],
        approved: null,
        phones: [],
        dates: [],
        locations: [],
        requestedTutors: [],
    })
};
const onSubmitForm = async(event) => {
    event.preventDefault()
    try{
        const body = data
        const response = await fetch("http://localhost:5000/push/create-schedule", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(body)
        })
        
        setOpenModal(true)
        // window.location = "/"
    }catch (error){
        console.error(error.message);
    }
    
}



const steps = [
    {
      label: 'Enter Sponsor Details',
      description: <SponsorDetailsStep data= {data} setData ={setData}/>,
    },
    {
        label: 'Enter Event Title',
        description: <EventTitleStep data= {data} setData ={setData}/>,
      },
    {
      label: 'Enter Event Details',
      description: <EventDetailsStep data= {data} setData ={setData}/>,
    },
    {
      label: 'Additional Comments',
      description: <EventCommentStep data= {data} setData ={setData}/>,
    },
];



    return(
        <>
        <Box sx={{marginLeft: 2}}>
            <Stack direction="row" spacing={2}>
                <Typography variant="h4">Get NHS Volunteers <VolunteerIcon fontSize="large"/> </Typography>
                <Button variant="text" component={Link} to="/login">Want an easier way... Login or Sign-Up Today!</Button> 
            </Stack>
        </Box>
        
        <Paper elevation={4} sx={{margin: 2, padding: 2}}>
        
        <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
            <Step key={step.label}>
                <StepLabel optional={index === 3 ? (
                    <Typography variant="caption">Submit</Typography>
                    ) : null}>
                {step.label}
                </StepLabel>
                <StepContent>
                <Typography>{step.description}</Typography>
                <Box sx={{ mb: 2 }}>
                    <div>
                    <Box>
                        {index === steps.length -1 ? 
                            <Button variant="contained" onClick={onSubmitForm} sx={{ mt: 1, mr: 1 }}>Submit</Button> :
                            <Button variant="contained" disabled={disableCont} onClick={handleNext} sx={{ mt: 1, mr: 1 }}>Continue</Button>
                        }
                        <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                            Back
                        </Button>
                    </Box>
                    
                    </div>
                </Box>
                </StepContent>
            </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>Succesfully Submited - check email for confirmation and more details</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Create New Event
            </Button>
            </Paper>
        )}
        <CreateEventModal open={openModal} setOpen={setOpenModal} data= {data}/>
    </Paper> 
    </>
    )
}
export default GetVolunteersForm
