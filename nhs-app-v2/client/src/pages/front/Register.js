import React, { Fragment, useState } from "react";
import {Link} from "react-router-dom"
import { toast } from "react-toastify";

//MUI Imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import LinkMUI from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';


//MUI Picker Imports
import {MuiPickersUtilsProvider,KeyboardDatePicker} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
//MUI Icons
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CloseIcon from '@mui/icons-material/Close';

const theme = createTheme({});

const Register = ({setAuth, setType}) => {
    
    const [data, setData] = React.useState({
        type: "",
        first_name: "",
        last_name: "",
        paid_dues: false,
        grade_level: "",
        student_id: null,
        birth_date: "",
        email: "",
        phone: "",
        password: '',
      })
    const {type,first_name,last_name,paid_dues,grade_level,student_id,birth_date,email,phone,password} = data

    const onChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }
    
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setData({...data, birth_date: date.toDateString()})
    };

    
    const onSubmitForm = async(e) =>{
        e.preventDefault()
        console.log(data)
        
        try {
            const body = {type,first_name,last_name,paid_dues,grade_level,student_id,birth_date,email,phone,password} 
            const response = await fetch('http://localhost:5000/auth/register', {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify(body)
            })
            
            const parseRes =  await response.json()
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token)

                if(!(data.type === "admin" || data.type === "member")){
                           setType("other_user")
                         }else{
                           setType(data.type)
                         }
                         localStorage.setItem("accountType", type);
                setAuth(true)
                toast.success("Registered Successfully");
              }else{
                  setAuth(false)
                  toast.error(parseRes)
              }
            
        } catch (err) {
            console.error(err.message)
        }
    }

    function displayForStudent(){
        if(type === "student" || type === "member"){
            return(
                <>
                <Grid item xs={12}>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="select-label">Grade</InputLabel>
                            <Select
                            labelId="select-label"
                            id="select"
                            value={data.grade_level}
                            label="School Year"
                            onChange={(event) => setData({...data, grade_level: event.target.value})}
                            >
                            <MenuItem value="freshman">Freshman</MenuItem>
                            <MenuItem value="sophomore">Sophomore</MenuItem>
                            <MenuItem value="junior">Junior</MenuItem>
                            <MenuItem value="senior">Senior</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="student_id"
                    label="Student ID"
                    type="student_id"
                    id="student_id"
                    onChange={onChange}
                    />
                </Grid>
                </>
            )
        }
    }


    return(
        <Fragment>
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>

              <Box sx={{ display: 'flex' }}>
              <FormControl>
                <FormLabel id="radio-buttons-group">I am a...</FormLabel>
                <RadioGroup
                  aria-labelledby="radio-buttons-group"
                  name="radio-buttons-group"
                  value={data.type}
                  onChange={(event) => setData({...data, type: event.target.value})}
                >
                  <FormControlLabel value="admin" control={<Radio />} label="admin --TO BE REMOVED" />
                  <FormControlLabel value="member" control={<Radio />} label="NHS Member" />
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                  <FormControlLabel value="parent" control={<Radio />} label="Parent" />
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                  <FormControlLabel value="sponsor" control={<Radio />} label="Event Sponsor" />
                  
                </RadioGroup>
              </FormControl>
              </Box>
              <Box component="form" noValidate onSubmit={onSubmitForm} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="first_name"
                      required
                      fullWidth
                      id="first_Name"
                      label="First Name"
                      autoFocus
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="last_name"
                      label="Last Name"
                      name="last_name"
                      autoComplete="family-name"
                      onChange={onChange}
                    />
                  </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={onChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={onChange}
                        />
                    </Grid>

                    {displayForStudent()}
                    
                    <Grid item xs={12}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            label="Date of Birth"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <LinkMUI href="/login" variant="body2">
                      Already have an account? Sign in
                    </LinkMUI>
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
            </Box>
          </Container>
          </ThemeProvider>
        </Fragment>
    )
}
export default Register

/*
<h1>Register</h1>
            <form onSubmit={onSubmitForm}>
                <input value={email} onChange={onChange} type = "email" name="email" placeholder="email" />
                <input type = "password" value={password} onChange={onChange} name="password" placeholder="password" />
                <input type = "text" value={name} onChange={onChange} name="name" placeholder="name" />
            <button >Submit</button>
            </form>
            <Link to="/login">Login</Link>
            */

            //try {
              //   const response = await fetch("http://localhost:5000/get-user-info/all",{
              //             method: "GET",
              //             headers: {token: localStorage.token}
              //         })
          
              //         const parseRes = await response.json()
              //         if(!(parseRes.type === "admin" || parseRes.type === "member")){
              //           setType("other_user")
              //         }else{
              //           setType(parseRes.type)
              //         }
              //         localStorage.setItem("accountType", parseRes.type);
              // } catch (err) {
              //   console.error(err.message);
              // }