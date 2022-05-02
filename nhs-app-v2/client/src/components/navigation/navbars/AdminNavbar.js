
import AdminDrawer from '../drawers/AdminDrawer';
//toast
import { toast } from "react-toastify";
//React Router Imports
import {Link,} from 'react-router-dom'
//MUI imports
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@mui/material/Button';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
//MUI Icon imports
import LogoutIcon from '@mui/icons-material/Logout';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction={'down'} in={!trigger}>
      {children}
    </Slide>
  );
}



export default function AdminNavbar({setAuth}) {
  
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("accountType")
    setAuth(false)
    toast.success("Logged out Successfully")
  }
  
  
  return (
    <div className = "MemberNavBar">
      <HideOnScroll >
      <AppBar >
        <Toolbar >
           <AdminDrawer setAuth={setAuth}/>
          <Box flexGrow={1} display={{ xs: 'none', sm: 'block' }}>

            <Typography variant="h6">NHS Admin Account</Typography>

          </Box>
          <Button color="inherit" onClick={logout}>Logout<LogoutIcon/></Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    </div>
    
  );
}