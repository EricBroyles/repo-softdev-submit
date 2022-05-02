import { useState } from 'react';

//React Router Imports
import {Link,} from 'react-router-dom'
//MUI Imports
import Box from '@material-ui/core/Box';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
//MUI Icons Imports
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import LoginIcon from '@mui/icons-material/Login';
import VolunteerIcon from '@mui/icons-material/VolunteerActivism';
import PersonIcon from '@mui/icons-material/Person';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function Drawer() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => {}}
      >
        <div className={classes.list}>
          <Box textAlign="center" p={2}>
            HSE National Honor Society
          </Box>
          <Divider />
          <List>
            <ListItem button component ={Link} to="/">
                <HomeIcon/>
                <ListItemText primary={'Home'}/>
            </ListItem>
            <ListItem button component ={Link} to="/help">
                
                <HelpIcon/>
                <ListItemText primary={'Help'} />
            </ListItem>
            <ListItem button component ={Link} to="/get-volunteers">
                <VolunteerIcon/>
                <ListItemText primary={'Get Volunteers'} />
            </ListItem>
            <ListItem button component ={Link} to="/get-tutor">
                <PersonIcon/>
                <ListItemText primary={'Get a Tutor'} />
            </ListItem>
            <ListItem button component ={Link} to="/login">
                <LoginIcon/>
                <ListItemText primary={'Login/Signup'} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}