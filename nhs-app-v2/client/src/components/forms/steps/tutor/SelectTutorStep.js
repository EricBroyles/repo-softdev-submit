import React from "react"
//MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import SearchIcon from '@mui/icons-material/Search';



async function getMemberNames(){
    try {
        const response = await fetch("http://localhost:5000/get-user-info/members-names", {
            method: "GET", 
        })
        const parseRes = await response.json()
        return(parseRes)
    } catch (err) {
        console.error(err)
    }
}

const SelectTutorStep = ({setData, data}) => {
    let key = 0
    const [reqTutorName, setReqTutorName] = React.useState("")
    const [membersNames, setMembersNames] = React.useState([])
    const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
    
    
      const handleRequestedTutors = () => {
        setReqTutorName("")
        //to lower case all data
        //is their a perfect match, cool
        //if not then are thier any matches for the first name or last name
        // if not then 


        //to lower case
        //search buy first name
        // and also last name if
        let name = reqTutorName.toLowerCase().split(" ")
        let first = name[0]
        let last = name[1]
        let match = false
        let possible = []
        membersNames.forEach((item) => {
            if(item.first_name === first && item.last_name === last){
                match = true
            }else if(item.first_name === first || item.last_name === last){
                possible.push(item)
            }
        })

        if(match){
            key++
            setData({...data, requestedTutors: [...data.requestedTutors, reqTutorName], requestedTutorsKeys: [...data.requestedTutorsKeys, key]});
            setSnackbar({ children: 'Member Found', severity: 'success' });
        }else if(possible.length !== 0){
            setSnackbar({ children: `Did you mean? ${possible.map((item, index) =>  " \"" + item.first_name + " " + item.last_name + "\"")}`, severity: 'info' });
        }else{
            setSnackbar({ children: 'No member found', severity: 'error' });
        }

        

        

      };
      
      const handleRemove = (i) => {
        let nameList = data.requestedTutors.filter((event, index) => index !== i)
        
        let keyList = data.requestedTutorsKeys.filter((event, index) => index !== i)
        setData({
            ...data, 
            requestedTutors: nameList,
            requestedTutorsKeys: keyList
        })
      }
    React.useEffect(() => {
        async function grabNames(){
            const usernames = await getMemberNames()
            //to lower case them all before adding them
            const temp = []
            usernames.map((item) => {
                temp.push({first_name: item.first_name.toLowerCase(), last_name: item.last_name.toLowerCase()})
            })
            setMembersNames([...temp])
        }
        grabNames()
    },[])

    return(
        <Box mb={4}>
        <Typography variant="h5" pt={3} pl={2}>Search for NHS members, only these nhs members will be able to accept this tutoring session request, if you do not have a prefference click "continue"</Typography>
                
        <Table sx={{ minWidth: 650}}>
        <TableRow>
            <TableCell>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel>Enter Name of NHS Member</InputLabel>
                <Input
                    value={reqTutorName}
                    onChange={(e) => setReqTutorName(e.target.value)}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <Fab color="primary" onClick={handleRequestedTutors}>
                    <SearchIcon />
                </Fab>
            </TableCell>
        </TableRow>
        </Table>


        {data.requestedTutorsKeys.length !== 0 ? 
            <Table sx={{ minWidth: 650}} >
            <TableHead>
            <TableRow>
                <TableCell>Name of Tutor</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {data.requestedTutorsKeys.map((tutorKey, index) => (
                
                <TableRow key={tutorKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">{data.requestedTutors[index]}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => handleRemove(index)}>Remove</Button>
                </TableCell>
                
                </TableRow>
            ))}
            </TableBody>
            </Table>
            :
            null
        }
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
        </Box>
    )
} 
export default SelectTutorStep

/*
usernames.forEach(element => {
                console.log("first", element.first_name.toLowerCase())
                console.log("last", element.last_name.toLowerCase())
                setMembersNames([...membersNames, {first_name: element.first_name.toLowerCase(), last_name: element.last_name.toLowerCase()}])
            });
            */