 //
import React from 'react';

import CommentStep from "../steps/CommentStep"
import EnterDetailsStep from '../steps/tutor/EnterDetailsStep';
import CreateEventModal from '../../modals/CreateEventModal';
import SelectTutorStep from '../steps/tutor/SelectTutorStep';
import ClassDetailsStep from '../steps/tutor/ClassDetailsStep';
import TimesLocationsStep from '../steps/tutor/TimesLocationsStep';
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
import PersonIcon from '@mui/icons-material/Person';




//requestedTutorsKeys

const GetTutorForm = () => {

const [activeStep, setActiveStep] = React.useState(0);
const [openModal, setOpenModal] = React.useState(false);
//set back to true
const [disableCont, setDisableCont] = React.useState(true)

//to be added to nhsdb --Schedule
const [data, setData] = React.useState({
    type: "tutoring",
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
    numSpots: null,
    approved: null,
    phones: [],
    dates: [],
    locations: [],
    requestedTutors: [],
    requestedTutorsKeys: [],
    timeSlotKeys: []
})


React.useEffect(() => {
    if(activeStep === 0 && data.names.length !== 0 && data.emails.length !== 0){
        setDisableCont(false)
    }else if(activeStep === 1 && data.tutoringSubjects.length !== 0 ){
        setDisableCont(false)
    }else if(activeStep === 2){
        setDisableCont(false)
    }else if(activeStep === 3 && data.timeSlotKeys.length !== 0){
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
        type: "tutoring",
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
        numSpots: null,
        approved: null,
        phones: [],
        dates: [],
        locations: [],
        requestedTutors: [],
        requestedTutorsKeys: [],
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
      label: 'Enter Name of Person to be Tutored, prefered email',
      description: <EnterDetailsStep data= {data} setData ={setData}/>,
    },
    {
        label: 'Enter class and describe what you need help in ie("help on essay", "review for test", etc.)',
        description: <ClassDetailsStep data= {data} setData ={setData}/>,
      },
    {
      label: 'Select a specific tutor, if no preference continue',
      description: <SelectTutorStep data= {data} setData ={setData}/>,
    },
    {
        label: 'Enter Possible times and Locations that could work',
        description: <TimesLocationsStep data= {data} setData ={setData}/>,
      },
    {
      label: 'Additional Comments',
      description: <CommentStep data= {data} setData ={setData}/>,
    },
];



    return(
        <>
        <Box sx={{marginLeft: 2}}>
            <Stack direction="row" spacing={2}>
                <Typography variant="h4">Get NHS Tutor <PersonIcon fontSize="large"/> </Typography>
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
            <Typography>Succesfully Submited - check email for confirmation</Typography>
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
export default GetTutorForm