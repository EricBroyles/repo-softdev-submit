import React from 'react';
//MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
//Icon

const ClassDetailsStep = ({data, setData}) => {
    


    const handleAddSubjects = (e) => {

    }
      
    return(
        <div>
        <Box mb={4}>   
         <Typography>Enter class and describe what you need help in ie("help on essay", "review for test", etc.) and location</Typography>
         {data.tutoringSubjects.length !== 0 ? <Typography>Current Class: {data.tutoringSubjects[0]}</Typography> : null}
         {data.tutoringTypes.length !== 0 ? <Typography>Current Details: {data.tutoringTypes[0]}</Typography> : null}
        <TextField 
            placeholder="Class" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={(e) => setData({...data, tutoringSubjects: [e.target.value]})}
        >
        </TextField>
        <TextField 
            placeholder="Description of what you need help on" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={(e) => setData({...data, tutoringTypes: [e.target.value]})}
        >
        </TextField>
        </Box>
        </div>
        
    )
}


export default ClassDetailsStep