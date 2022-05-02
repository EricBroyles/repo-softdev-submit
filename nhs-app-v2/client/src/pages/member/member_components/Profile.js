import React from 'react'


//MUI Imports
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
//DataGrid Imports
import { DataGrid } from '@mui/x-data-grid';
//MUI Icon Imports



const columns = [
    {field: 'contacts', width: 200, headerName: 'Contacts', },
    {field: 'value',width: 200, editable: true},
    {field: 'isPrefered',headerName: 'Prefered Method',width: 200, type: 'boolean',editable: true},
    
  ]
  const rows = [
      {id: 0, contacts: "Email", value: "@gmail", isPrefered: false},
      {id: 1, contacts: "Phone Number", value: "1111111111", isPrefered: false},
      {id: 2, contacts: "Emergency Contacts", value:"1111111111", isPrefered: false},
  ]
  const notificationColumns = [
    {field: 'name',width:400, headerName: 'Recieve notifications by (prefered Method) for:'},
    {field: 'doEmailNotify', width: 200, headerName: 'Email', type: 'boolean',editable: true},
    {field: 'doPhoneNotify', width: 200, headerName: 'Phone', type: 'boolean',editable: true}
  ]
  const notificationRows = [
    {id: 0,name: 'new Tutoring Opertunity', doEmailNotify: true, doPhoneNotify: true},
    {id: 1,name: 'new Event Opertunity', doEmailNotify: true, doPhoneNotify: true},
    {id: 2,name: 'new Anouncment', doEmailNotify: true, doPhoneNotify: true},
    {id: 3,name: 'new Update to Schedule', doEmailNotify: true, doPhoneNotify: true},
    {id: 4,name: 'new Application Available', doEmailNotify: true, doPhoneNotify: true},
  ]


  

//sample of all classes
let id = 0;
const allClasses = [
    "Algebra I", 
    "Algebra II",
    "Geometry", 
    "Chemistry",
    "Physics",
    "English 9",
    "English 10",
    "AP Test",
    "SAT",
    "ACT"
]

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  

const Profile = () => {
    
    
    
    
    const [canTutorInList, setCanTutorInList] = React.useState([])
    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
    
    const handleChange = (event) => {
        let noDuplicates = true
        canTutorInList.map((item) => {
            if(item.name === event.target.value){
                noDuplicates = false
            }
        })
        if(noDuplicates){
            setCanTutorInList( arr => [...arr, {key: id, name: event.target.value}])
            id++
        }else{
            setOpen(true);
        }
    };
    const handleDelete = (name) => {
        const newList = canTutorInList.filter((item) => item.name !== name)
        console.log(newList)
        console.log(name)
        setCanTutorInList(newList)
    };
    
    return(
        <div className = "Profile">
            
            <Box mt={6} p={2}>
                <Paper elevation={4}>
                    <Typography>Pending Update Confimation -  to be displayed when hours should be added but are being waited on</Typography>
                    <Typography>Tutoring Hours: x/neccisary num</Typography>
                    <Typography>Service Hours: x/neccisary num</Typography>
                    <Typography>Service Projects: x/neccisary num</Typography>
                    <Typography>Paid Dues: x/neccisary num</Typography>
                </Paper>
            </Box>

            <Box p={2}>
            <Typography m={2}>Profile of Name (role)</Typography>
                <Paper elevation={4} >
                <Grid container spacing={2} p={1}>
                    <Grid item>
                        <Typography>Available to Tutor in </Typography>
                    </Grid>
                    <Grid item>
                        <Box sx={{ minWidth: 120, marginTop: 1}}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Class</InputLabel>
                            <Select
                            labelId="select-label"
                            id="select"
                            label="Choose Class"
                            onChange={handleChange}
                            >
                            {allClasses.map((item) => {
                                return(
                                    <MenuItem key ={item} value={item}>{item}</MenuItem>
                                )
                            })}
                        
                            </Select>
                        </FormControl>
                        </Box>
                    </Grid>
                    <Grid item>
                        {canTutorInList.map((item) => {
                            return(
                                <Chip key ={item.key} label={item.name} variant="outlined" onDelete={() => handleDelete(item.name)} />
                            )
                        })}
            
                        
                    
                    </Grid>
                </Grid>
                </Paper>
            </Box>
            <div style={{height: 275,marginLeft:20, width: '80%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                
            />
            </div>
            <div style={{height: 275, marginLeft:20, width: '80%' }}>
            <DataGrid
                rows={notificationRows}
                columns={notificationColumns}
                
            />
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                Item Already Exists
                </Alert>
            </Snackbar>
            
            
        </div>
    )
}

export default Profile