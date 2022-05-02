import * as React from 'react';

import EventCard from '../../../components/cards/todo/EventCard';
import MemberIssueCard from '../../../components/cards/todo/MemberIssueCard';
import ApplicationCard from '../../../components/cards/todo/ApplicationCard';
import HoursCard from '../../../components/cards/todo/HoursCard';
import FastFactsCard from '../../../components/cards/FastFactsCard';
import ControlApplicationCards from '../../../components/cards/ControlApplicationsCard';
//MUI Imports
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index) {
    return {
      id: `tab-${index}`,
      'aria-controls': `tabpanel-${index}`,
    };
  }



  

const Dashboard = () => {
    const [value, setValue] = React.useState(0);
    const [eventList, setEventList] = React.useState([])
    const [issueList, setIssueList] = React.useState([])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //type: "proposed-events", "approved-events"
async function getEvents(){
  //0 is all proposed event
  //4 is all approved-events
  let type = ""

  if(value === 0){
    type = "proposed-events"
  }else if(value === 4){
    type = "approved-events"
  }else{
    console.log("ERROR")
  }
  try {
      const response = await fetch(`http://localhost:5000/get-schedule-info/${type}`,{
          method: "GET",
          headers: {token: localStorage.token}
      })
      const parseRes = await response.json()
      
      setEventList([...parseRes])
  } catch (err) {
      console.error(err.message)
  }
}
async function getIssues(){
  try {
    const response = await fetch(`http://localhost:5000/get-issues-info/all`,{
          method: "GET",
          headers: {token: localStorage.token}
      })
      const parseRes = await response.json()
      setIssueList([...parseRes])
  } catch (err) {
    console.error(err.message)
  }
}



    React.useEffect(() => {
      if(value === 0 || value === 4){
        getEvents()
      }else if( value === 1){
        getIssues()
      }
      
    }, [value])


    return(
    <div className = "dashboard" >
      
      <Grid container spacing={5} mt={5}>
        <Grid item >
        <Typography component={'span'} variant="h4" ml={5}>To Do</Typography>
        <Paper aria-label="paper 1" elevation={4}sx={{minHeight: 600, maxWidth: 900, m: 1}}>
        
          <Box display="flex"  sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs value={value} onChange={handleChange} aria-label="tabs">
              <Tab label="Event Proposals" {...a11yProps(0)} />
              <Tab label="Member Issues" {...a11yProps(1)} />
              <Tab label="Submitted Hours" {...a11yProps(2)} />
              <Tab label="Applications" {...a11yProps(3)} />
              <Tab label="Scheduled" {...a11yProps(4)} />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            {eventList.map((event) => <EventCard key={event.schedule_id} details={event}/>)}


          </TabPanel>
          <TabPanel value={value} index={1}>
            {issueList.map((item) => <MemberIssueCard key={item.issue_id} id={item.issue_id} details={item} issueList={issueList} setIssueList={setIssueList}/>)}
            
            
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ApplicationCard/>
            <HoursCard/>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item 4
          </TabPanel>
          <TabPanel value={value} index={4}>
          {eventList.map((event) => <EventCard key={event.schedule_id} details={event}/>)}
          </TabPanel>
        </Paper>          
        </Grid>
        <Grid item >
            <Typography component={'span'} variant="h4" mt={10} ml={2}>Key Controls</Typography>
            <FastFactsCard/>
            <ControlApplicationCards />
        </Grid>
      </Grid>
      
      
      </div>
    )
}

export default Dashboard

/*
const getEvents = async() => {
  //e.preventDefault()
  //0 is all proposed event
  //4 is all approved-events
  let type = ""
  
  if(value === 0){
    type = "proposed-events"
  }else if(value === 4){
    type = "approved-events"
  }else{
    console.log("ERROR")
  }
  console.log("type", type)
  try {
    console.log("getevents localstored token" )
    console.log(localStorage.token )
    const response = await fetch(`http://localhost:5000/get-schedule-info/${type}`, {
      method: "GET", 
      header: {token: localStorage.token}
    })
    const parseRes = await response.json()
    //should give a list of objects 
    console.log(parseRes)
    setEventList([...parseRes])

  } catch (err) {
    console.error(err)
  }

}
*/