
import ImageList from "../../../components/helper/imageList"
import Box from '@mui/material/Box';
import {Fab, Input} from '@mui/material'
import { Add }from '@mui/icons-material'
import { useRef } from "react";


const Build = () => {
    
    
    const handleClick = () => {
        fileRef.current.click()
    }
    const fileRef = useRef()


    return(
        <div className ="Build">
            <h1>aBUilid for admin</h1>
            
            <Box>
                <Input type="file" multiple sx={{display: 'none'}} 
                    inputRef = {fileRef}
                />
                <Fab color="primary" aria-label="add" onClick={handleClick}>
                    <Add fontsize= "large" />
                </Fab>
            </Box>
            <ImageList/>
        </div>
    )
}

export default Build