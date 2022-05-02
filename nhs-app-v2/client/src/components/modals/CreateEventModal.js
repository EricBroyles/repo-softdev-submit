import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //Some major cahnges the submit btn should not add the item to the db, the finish btn after the modal should do that


  

  
  //look ove the info to confirm that all details are in order, 
  //Is there an Issue go back to form...
  //ALl good? btn
  //after confimation
  //We are all set!
  //hold onto the email we sent you, use the id number if you want to cancel the proposed event
  //Finish. --routes you back to the home page
  
//sent email also has links to where you can cancel an event, and where you can create a new event

const CreateEventModal = ({open, setOpen, data}) => {
    
    const handleClose = () => setOpen(false);
    const addComma = (list, i) => {
        if(i < list.length-1){
            return(", ")
        }else{
            return("")
        }
    }

    return (
        <div>
        
        <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Congrats! Your request has been submitted succesfully.
            </Typography>
            <Typography id="modal-modal-description" variant='subtitle2' sx={{ mt: 2 }}>
                To make sure we can reach you...
            </Typography>
            <Typography paragraph id="modal-modal-description" sx={{ mt: 3 }}>
                We sent an email to {data.emails[0]} that contains all the submited info, as well as an ID NUMBER
            </Typography>
            <TextField fullWidth label="Please enter the ID NUMBER to confirm your email" variant="outlined" />
            
            <Link component="button" variant="body2" onClick={() => {console.info("I'm a button.");}}>
            Didn't get it... Click Here to Resend
            </Link>
            </Box>
        </Modal>
        </div>
    );
}
export default CreateEventModal