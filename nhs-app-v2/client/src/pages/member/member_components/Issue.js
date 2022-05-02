import React, {useState, Fragment} from "react"


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize'
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Issue = () => {
    const [data, setData] = useState({
        user_type: "member", 
        name: "",
        email: "",
        content: "",
        issue_type: "",
        date: new Date().toDateString(),
    })
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const onSubmitForm = async(e) => {
        e.preventDefault()
        setData({
            user_type: "member", 
            name: "",
            email: "",
            content: "",
            issue_type: "",
            date: new Date().toDateString(),
        })

        try {
            const body = data
            
            const response = await fetch("http://localhost:5000/report/issue", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            const parseRes = await response.json()
            setSnackbar({ children: 'Issue successfuly Recorded', severity: 'success' });
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <Fragment>
            <Box component="form" onSubmit={onSubmitForm} sx={{mt: 10, p: 2}}>
                <Paper elevation={2} p={5}>
                <Typography>Having Issues? Report them here.</Typography>
                <TextField label="Name" variant="outlined" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                <TextField label="Email" variant="outlined" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                <TextareaAutosize placeholder="Describe your issue here." style={{width: '90%'}} onChange={(e) => setData({...data, content: e.target.value})}></TextareaAutosize>
                <Button type="submit">Submit</Button>
                </Paper>
                
            </Box>
            {!!snackbar && (
                <Snackbar
                open
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                onClose={handleCloseSnackbar}
                autoHideDuration={6000}
                >
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </Fragment>

    )
}

export default Issue