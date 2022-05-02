import * as React from 'react';
import TableForEvent from '../helper/TableForEvent'
//MUI Imports
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
//MUI Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
//table: [{beginTime, endTime, date, location, spots}]
//contacts {email, phone}
export default function EventSignUpCard({table, title, sponsor, description, contacts}){
    const[newTagDisplay, setNewTagDisplay] = React.useState('display')
    const handleNewTagDisplay = () => {
      if(newTagDisplay === 'display'){
        setNewTagDisplay('none')
      }
    }
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    
    return(
        <Card elevation={5} onClick = {handleNewTagDisplay} sx={{padding: 2, marginBottom: 2}}>
          <Alert severity="info">
          <Stack direction="column" spacing= {1}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">{title}</Typography>
              <Chip label="New" color="info" sx={{display: newTagDisplay}}/>
            </Stack>
            <Typography variant="b1">{sponsor}</Typography>
            <Typography variant="b1">{description}</Typography>
          </Stack>

          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <TableForEvent table={table}/>
            </CardContent>
          </Collapse>
          <Typography variant="b1">Questions? {contacts.email} or {contacts.phone}</Typography>
          </Alert>
        </Card>
    )
}