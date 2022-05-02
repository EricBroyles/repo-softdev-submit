import React from 'react';
//MUI Imports
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
//Icon

const EventCommentStep = ({data, setData}) => {
    
    const handleComment = (event) => {
        setData({...data, comment: event.target.value})
    }
      
    return(
        <Box mb={4}>
        {data.comment !== "" ? <Typography>Comment (not required): {data.comment}</Typography> : null}    
        <TextField 
            placeholder="comments" 
            multiline sx={{mt:3 }} 
            fullWidth
            onChange={handleComment}
        >
        </TextField>
        </Box>
        
    )
}


export default EventCommentStep