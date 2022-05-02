import react, {Fragment} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from  '@mui/material/Paper'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import TextField from '@mui/material/TextField';
import React from 'react';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//MUI Picker Imports
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

//db removal policies, all years refer to the specified end to the nhs year
//1. SHould remove all announcements at the end of the year
//2. remove all member issues at the end of the year



//use an mui accordian
const Controls = () => {
const [snackbar, setSnackbar] = React.useState(null);
const handleCloseSnackbar = () => setSnackbar(null);
const [data, setData]= React.useState({
    admin_id: null, 
    req_tutoring_hrs: 0,
    req_service_hrs: 0,
    req_service_proj: 0,
    sponsors_name: [],
    sponsors_email: [],
    removal_policy_id: 0,
    website_email: "",
    end_date: "",
    begin_date: "",
})
//contents of the db
const [content, setContent]= React.useState({
    admin_id: null, 
    req_tutoring_hrs: 0,
    req_service_hrs: 0,
    req_service_proj: 0,
    sponsors_name: [],
    sponsors_email: [],
    removal_policy_id: 0,
    website_email: "",
    end_date: "",
    begin_date: "",
})
const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
}
const [beginDate, setBeginDate] = React.useState(new Date());
const [endDate, setEndDate] = React.useState(new Date());
    const handleBeginDateChange = (date) => {
        setBeginDate(date);
        setData({...data, begin_date: date.toDateString()})
    };
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setData({...data, end_date: date.toDateString()})
    };
const handleSet = async(e) => {
    e.preventDefault()
    console.log("putting the data", data)
    const temp = await putData()
    setData({...temp})
    setContent({...temp})
    setSnackbar({ children: 'Change Saved', severity: 'success' });
}

async function getData(){
    
    try {
        const response = await fetch("http://localhost:5000/get-admin-info/all", {
        method: "GET",
        headers: {token: localStorage.token}
    })
    const parseRes = await response.json()
    return parseRes
    } catch (err) {
        console.error(err)
    }
}

async function putData(){
    const body = data
    try {
        const response = await fetch("http://localhost:5000/update-admin/admin", {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            token: localStorage.token
          },
          body: JSON.stringify(body)
    })
    const parseRes = await response.json()
    return parseRes
    } catch (err) {
        console.error(err)
    }
}

React.useEffect(() => {
    async function get(){
        const temp = await getData()
        setData({...temp})
        setContent({...temp})
    }
    get()
},[])

React.useEffect(() => {
   console.log(beginDate)
   console.log(endDate)
     console.log("data", data)
     console.log("content", content)
}, [data, content])



    return(
    <Fragment>
    <Paper sx={{mt: 10, ml: 2, mr:2,  p: 4}}>
        <Typography variant="h4"mb={2}>Admin Controls <AccountTreeIcon fontSize="large"/></Typography>
      <Accordion sx={{p:2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Sponsor Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            change the names and of nhs sponsors and set their emails
          </Typography>
        </AccordionDetails>
      </Accordion >
      <Accordion sx={{p:2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Service Requirements</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            change the service reqs, tutoring hours, number of hours for service, and number of service projects
          </Typography>
        </AccordionDetails>
      </Accordion >
      <Accordion sx={{p:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Admin Notifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            change the ways and things that the admin will be notified for
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{p:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Database Maintainance</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            change the automatic database removal policies
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{p:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>NHS Start and End Date</Typography>
        </AccordionSummary>
        
        <AccordionDetails>
        <Typography>
            Change the NHS start and end date
          </Typography>
        <Stack component="form" noValidate onSubmit={handleSet} direction="row"> 
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                label="Select Start Date"
                format="MM/dd/yyyy"
                value={beginDate}
                onChange={handleBeginDateChange}
                />
            </MuiPickersUtilsProvider>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                label="Select End Date"
                
                format="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                />
            </MuiPickersUtilsProvider>
            <Button type="submit">
                <FileDownloadDoneIcon fontSize="large"/>
            </Button>
        </Stack>
        </AccordionDetails>
      </Accordion>




      <Accordion sx={{p:2}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Other</Typography>
        </AccordionSummary>
        
        <AccordionDetails>
          <Typography>
            Change Website Email (used by this website to send emails)
          </Typography>
        <Stack component="form" noValidate onSubmit={handleSet} direction="row"> 
            <TextField
                autoComplete="given-email"
                name="website_email"
                fullWidth
                id="website_email"
                label={content.website_email}
                autoFocus
                onChange = {onChange}
            />
            <Button type="submit">
                <FileDownloadDoneIcon fontSize="large"/>
            </Button>
        </Stack>
        </AccordionDetails>
      </Accordion>
      </Paper>
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      </Fragment>
    ) 
}

export default Controls


