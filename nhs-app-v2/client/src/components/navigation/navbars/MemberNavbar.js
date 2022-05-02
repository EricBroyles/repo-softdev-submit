import React, {useState, useEffect} from 'react';

import MemberDrawer from '../drawers/MemberDrawer';
//Toast imports
import { toast } from "react-toastify";
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



export default function MemberNavbar({setAuth}) {
  
  const [name, setName] = useState("")

    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/get-user-info/all",{
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json()
            setName(parseRes.first_name + " " + parseRes.last_name)
        } catch (err) {
            console.log(err.message)
        }
    }
  
  useEffect(()=> {
    getName()
  }, [])
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    localStorage.removeItem("accountType")
    setAuth(false)
    toast.success("Logged out Successfully")
  }
  
  return (
    <div className = "MemberNavBar">
      <HideOnScroll>
      <AppBar >
        <Toolbar>
           <MemberDrawer setAuth ={setAuth} name = {name}/>
          <Box flexGrow={1} display={{ xs: 'none', sm: 'block' }}>

            <Typography variant="h6">{name} NHS Account</Typography>

          </Box>
          <Button color="inherit" onClick={logout}>Logout<LogoutIcon/></Button>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
    </div>
    
  );
}