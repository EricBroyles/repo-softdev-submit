import React from 'react';
//MUI Imports
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
//Icons
import AddIcon from '@mui/icons-material/Add';

const SponsorDetailsStep = ({data, setData}) => {
    
    const [sponsorDetails, setSponsorDetails] = React.useState({sponsorKey: 0, name: "", email: "", phone: ""})
    const [isDisabled, setIsDisabled] = React.useState(true)
    
      const handleSponsorDetails = (type) => (event) => {
        if(!(sponsorDetails.name === "" || sponsorDetails.email === "")){
            setIsDisabled(false)
        }
        setSponsorDetails({...sponsorDetails, [type]: event.target.value});
      };
      const handleSponsorList = () => {
        setData({
            ...data,
            sponsorKeys: [...(data.sponsorKeys), sponsorDetails.sponsorKey], 
            names: [...(data.names), sponsorDetails.name], 
            emails: [...(data.emails), sponsorDetails.email], 
            phones: [...(data.phones), sponsorDetails.phone]
        })
        setSponsorDetails({sponsorKey: sponsorDetails.sponsorKey +1, name: "", email: "", phone: ""})
        setIsDisabled(true)
      }
      const handleRemoveSponsor = (i) => {
        let nameList = data.names.filter((event, index) => index !== i)
        let emailList = data.emails.filter((event, index) => index !== i)
        let phoneList = data.phones.filter((event, index) => index !== i)
        let sponsorKeyList = data.sponsorKeys.filter((event, index) => index !== i)
        setData({
            ...data, 
            names: nameList,
            emails: emailList, 
            phones: phoneList,
            sponsorKeys: sponsorKeyList
        })
      }
    
    

    return(
        <Box mb={4}>
        <Typography variant="h5" pt={3} pl={2}>Sponsor Details</Typography>
                
        <Table sx={{ minWidth: 650}}>
        <TableRow>
            <TableCell>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel>Name of Sponsor</InputLabel>
                <Input
                    value={sponsorDetails.name}
                    onChange={handleSponsorDetails('name')}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel>Email Address (Required)</InputLabel>
                <Input
                    value={sponsorDetails.email}
                    onChange={handleSponsorDetails('email')}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
            <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel>Phone Number (Optional)</InputLabel>
                <Input
                    value={sponsorDetails.phone}
                    onChange={handleSponsorDetails('phone')}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <Fab color="primary" disabled={isDisabled} onClick={handleSponsorList}>
                    <AddIcon />
                </Fab>
            </TableCell>
        </TableRow>
        </Table>


        {data.sponsorKeys.length !== 0 ? 
            <Table sx={{ minWidth: 650}} >
            <TableHead>
            <TableRow>
                <TableCell>Contact Order</TableCell>
                <TableCell align="right">Name of Sponsor</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone (optional)</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            
            {data.sponsorKeys.map((sponsorKey, index) => (
                
                <TableRow key={sponsorKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>{index === 0 ? 'MAIN' : index+1}</TableCell>
                <TableCell component="th" scope="row">{data.names[index]}</TableCell>
                <TableCell align="right">{data.emails[index]}</TableCell>
                <TableCell align="right">{data.phones[index]}</TableCell>
                <TableCell align="right">
                    <Button variant="contained" color="error" onClick={() => handleRemoveSponsor(index)}>Remove</Button>
                </TableCell>
                
                </TableRow>
            ))}
            </TableBody>
            </Table>
            :
            null
        }
        


        </Box>
    )
}

export default SponsorDetailsStep