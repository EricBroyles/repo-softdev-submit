import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//MUI Imports
import Button from '@mui/material/Button';
import Box from '@material-ui/core/Box';
import LinkMUI from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography';
//Icons
import CloseIcon from '@mui/icons-material/Close';


const Login = ({ setAuth, setType }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });
  const { email, password } = inputs;

  const onChange = e =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        try {
          const response = await fetch("http://localhost:5000/get-user-info/all",{
                    method: "GET",
                    headers: {token: localStorage.token}
                })
    
                const parseRes = await response.json()
                if(!(parseRes.type === "admin" || parseRes.type === "member")){
                  setType("other_user")
                }else{
                  
                  setType(parseRes.type)
                }
                localStorage.setItem("accountType", parseRes.type);
        } catch (err) {
          console.error(err.message);
        }
        
        
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  
  

  return (
    <Fragment>
      <Paper sx={{padding: 2, marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center'}} >
            <Typography component="h1" variant="h5">Login</Typography>
            <Box component="form" onSubmit={onSubmitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2} justifyContent="flex-end">
                <Grid item xs={12}>
                    <TextField required fullWidth id="email" label="Email Address" name="email" onChange={onChange}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField required fullWidth  id="password" label="Password" type="password"name="password" onChange={onChange}/>
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                     Login
                    </Button>
                </Grid>
                <Grid item>
                    <LinkMUI component={Link} to="/register" variant="body2">Don't have an account? Register here</LinkMUI>
                </Grid>
            </Grid>
            <Grid container justifyContent="center">
                <Grid item>
                    <Fab color="secondary" aria-label="close" component={Link} to="/">
                        <CloseIcon />
                    </Fab>
                </Grid>
            </Grid>
            </Box>
        </Paper>
    </Fragment>
  );
};

export default Login;


/*
<h1>Login</h1>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={onChange}
          
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
      <Link to="/register">register</Link>

      */