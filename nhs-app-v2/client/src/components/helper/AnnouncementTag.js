import * as React from 'react';



//React Router Imports
import {Link,} from 'react-router-dom'
//MUI Imports
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button'


const AnnouncementTag = () => {
    const [display, setDisplay] = React.useState(true)
    if(display){
        return(
            <Alert sx={{mt: 8}} severity='info' onClose={() => {setDisplay(false)}}>
                <Button component={Link} to="/username/announcements">
                Here is an Announcement
                </Button>
            </Alert>
        )
    }
    else{
       return(null) 
    }

}
export default AnnouncementTag