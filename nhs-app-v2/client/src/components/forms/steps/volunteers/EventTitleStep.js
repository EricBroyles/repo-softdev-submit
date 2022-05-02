import React from 'react';
//MUI Imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
//Icon

const EventTitleStep = ({data, setData}) => {
    
    const handleTitle = (event) => {
        setData({...data, title: event.target.value})
        
    }
      
    return(
        <div>
        <Box mb={4}>   
        {data.title !== "" ? <Typography>Title: {data.title}</Typography> : null} 
        <TextField 
            placeholder="Event Title" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={handleTitle}
        >
        </TextField>
        </Box>
        </div>
        
    )
}


export default EventTitleStep