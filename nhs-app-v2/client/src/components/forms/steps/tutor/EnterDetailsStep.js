import React from 'react';
//MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
//Icon

const EnterDetailsStep = ({data, setData}) => {
    
    
      
    return(
        <div>
        <Box mb={4}>   
         <Typography>Please enter the tutoree's name and your prefered email</Typography>
         {data.names.length !== 0 ? <Typography>Current Name: {data.names[0]}</Typography> : null}
         {data.emails.length !== 0 ? <Typography>Current Emails: {data.emails[0]}</Typography> : null}
        <TextField 
            placeholder="Name of Person to be Tutored" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={(e) => setData({...data, names: [e.target.value]})}
        >
        </TextField>
        <TextField 
            placeholder="Prefered Email" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={(e) => setData({...data, emails: [e.target.value]})}
        >
        </TextField>
        </Box>
        </div>
        
    )
}


export default EnterDetailsStep