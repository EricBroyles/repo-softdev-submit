import * as React from 'react';

//MUI Imports
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

//MUI Icons Imports
import TextFieldsIcon from '@mui/icons-material/TextFields';
import NumbersIcon from '@mui/icons-material/Numbers';



//gets passed: list of all the items of the application as objects {type, text, wordCount}, as well as the date publish on and date available iuntil


export default function ListForApplicaiton({items, publishDate, untilDate}){
    
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    
    const handleTypeIcon = (type) => {
        if(type === "TextField"){
            return(
                <TextFieldsIcon/>
            )
        }else{
            return(
                <NumbersIcon/>
            )
        }
    }

    return(
        <Box sx={{ width: '100%', maxWidth: 460, bgcolor: 'background.paper' }}>
            <List aria-label="list">
                
                {items.map((item, index) => {
                    return(
                    <ListItemButton  selected={selectedIndex === index} onClick={(event) => handleListItemClick(event, index)}>
                        <ListItemIcon>
                            {handleTypeIcon(item.type)}
                        </ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                    )
                })}
            </List>
            <Button >Edit takes to place to edit or opens nodial thing</Button>
            
            </Box>
    )
}