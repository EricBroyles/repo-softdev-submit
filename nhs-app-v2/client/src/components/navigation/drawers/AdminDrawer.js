import { useState } from 'react';
//toast
import { toast } from "react-toastify";
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
import ScheduleIcon from '@mui/icons-material/Schedule';

import LogoutIcon from '@mui/icons-material/Logout';

import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BuildIcon from '@mui/icons-material/Build';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

export default function AdminDrawer({setAuth}) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("accountType")
    setAuth(false)
    toast.success("Logged out Successfully")
  }


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
            NHS Admin Account
          </Box>
          <Divider />
          <List>
            <ListItem button component ={Link} to="/admin">
                <ScheduleIcon/>
                <ListItemText primary={'Dashboard'}/>
            </ListItem>
            <ListItem button component ={Link} to="/admin/people">
                <PeopleIcon/>
                <ListItemText primary={'People'}/>
            </ListItem>
            <ListItem button component ={Link} to="/admin/announcements">
                <NotificationsIcon/>
                <ListItemText primary={'Announcements'}/>
            </ListItem>
            <ListItem button component ={Link} to="/admin/build">
                <BuildIcon/>
                <ListItemText primary={'Build'}/>
            </ListItem>
            <ListItem button component ={Link} to="/admin/controls">
                <AccountTreeIcon/>
                <ListItemText primary={'Controls'}/>
            </ListItem>
            <ListItem button onClick={logout}>
                <ListItemText primary={'Logout'} />
                <LogoutIcon/>
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </div>
  );
}