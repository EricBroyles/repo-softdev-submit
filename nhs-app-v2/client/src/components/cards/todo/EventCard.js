import * as React from 'react';
//MUI Imports
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
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

export default function EventCard({details}){
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
        <Card elevation={5} onClick = {handleNewTagDisplay} sx={{ padding: 2, marginBottom: 2}}>
          <Alert severity="info">
          <Stack direction="column" spacing= {1}>
            <Stack direction="row" spacing={1}>
              <Typography component={'span'} variant="h5">Event{details.approved === null ? " Proposal" : null }: {details.title}</Typography>
              <Chip label="New" color="primary" sx={{display: newTagDisplay}}/>
            </Stack>
            <Typography component={'span'} variant="b1">Sponsors: {details.names.map((name) => name)}</Typography>
            <Typography component={'span'} varient="b1">Email: {details.emails.map((email) => email)} </Typography>
            <Typography component={'span'} varient="b1">Phone: {details.phones.map((p) => p)} </Typography>
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

            <Typography component={'span'} varient="b1">Time Slot Details: </Typography>
            <Typography component={'span'} varient="b1">Location: {details.locations.map((item) => item)}</Typography>
            <Typography component={'span'} varient="b1">Dates: {details.dates.map((spot) => spot)} </Typography>
            <Typography component={'span'} varient="b1">Begin Times: {details.begin_times.map((spot) => spot)} </Typography>
            <Typography component={'span'} varient="b1">End TImes: {details.end_times.map((spot) => spot)} </Typography>
            <Typography component={'span'} varient="b1">Number of Members: {details.num_spots.map((spot) => spot)} </Typography>
              <Typography component={'span'} paragraph>{details.comment}</Typography>
              
              
            </CardContent>
          </Collapse>
          {details.approved === null ? 
              <Stack direction="row" spacing={2}>
                <Button>Approve</Button>
                <Button>Reject</Button>
              </Stack>
              : 
              <Button>Cancel</Button>
              }
          </Alert>
        </Card>
    )
}