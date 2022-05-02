import * as React from 'react';
//MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//MUI Icons Imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
  }));
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

const ScheduleCard = ({type, title, date, times, location, names, contacts, link, notifications, tutoringInfo, comment}) => {
    
    const [openMenu, setOpenMenu] = React.useState(false);
    const handleMenuOpen = (e) => {
        setOpenMenu(e.currentTarget);
    };
    const handleMenuClose = () => {
        setOpenMenu(false);
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
    <Root>
    
    <Card raised sx={{width: 400}}>
        <CardHeader 
            title= {title}
            action={
                <div>
                    <IconButton aria-label="notifications">
                        <NotificationsIcon/>
                    </IconButton>
                    <IconButton 
                        aria-label="more-options"
                        id="basic-button"
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </div>
            }
        />
        <Menu id="basic-menu" open={openMenu} onClose={handleMenuClose} anchorEl={openMenu}>
            <MenuItem onClick={handleMenuClose}>Send Message</MenuItem>
            <MenuItem onClick={handleMenuClose}>Re-Schedule</MenuItem>
            <MenuItem onClick={handleMenuClose} sx={{backgroundColor: 'red', color: 'dark-gray', fontWeight: 'bold'}}>Cancel Session</MenuItem>
        </Menu>

      <CardContent>
        <Typography variant="body1" color="text.secondary">
          For: {date}, {times.map((time) => {return(time + ", ")})}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          At: {location}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {link}
        </Typography>
      </CardContent>

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
          <Typography paragraph>{names.map((name) => {return(name + ", ")})}</Typography>
          <Typography paragraph>{contacts.map((contact) => {return(contact + ", ")})}</Typography>
          <Typography paragraph>Subjects: {tutoringInfo.subjects.map((subject) => {return(subject + ", ")})}</Typography>
          <Typography paragraph>Subjects: {tutoringInfo.types.map((type) => {return(type + ", ")})}</Typography>
          <Typography paragraph>Comments: {comment}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Root>
    )
}






export default ScheduleCard