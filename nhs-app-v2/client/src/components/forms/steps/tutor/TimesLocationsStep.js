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
import TextField from '@mui/material/TextField';
//LAB
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileTimePicker from '@mui/lab/MobileTimePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

//Icon
import AddIcon from '@mui/icons-material/Add';

const TimesLocationsStep = ({data, setData}) => {
    
    const [eventDetails, setEventDetails] = React.useState({eventKey: 0, date: new Date(), location: "", beginTime: new Date(), endTime: new Date()})
    const [isDisabled, setIsDisabled] = React.useState(true)
    const [pins, setPins] = React.useState({datePin: false, locationPin: false, beginTimePin: false, endTimePin: false})
    
    React.useEffect(() => {
        if(pins.datePin === true && pins.locationPin === true && pins.beginTimePin === true && pins.endTimePin === true){
            setIsDisabled(false)
        }
    }, [pins])
    const handleEventList = () => {
        setData({
            ...data, 
            dates: [...data.dates, eventDetails.date.toDateString()],
            locations: [...data.locations, eventDetails.location], 
            beginTimes: [...data.beginTimes, eventDetails.beginTime.toLocaleTimeString('en-US')],
            endTimes: [...data.endTimes, eventDetails.endTime.toLocaleTimeString('en-US')],
            numSpots: [1],
            timeSlotKeys: [...data.timeSlotKeys, eventDetails.eventKey]
        })
        setEventDetails({timeSlotKey: eventDetails.timeSlotKey +1, date: new Date(), location: "", beginTime: new Date(), endTime: new Date()})
        setIsDisabled(true)
        setPins({datePin: false, locationPin: false, beginTimePin: false, endTimePin: false})
    }

    const handleRemoveEvent = (i) => {
        let dateList = data.dates.filter((event, index) => index !== i)
        let beginTimeList = data.beginTimes.filter((event, index) => index !== i)
        let endTimeList = data.endTimes.filter((event, index) => index !== i)
        let locationList = data.locations.filter((event, index) => index !== i)
        let keyList = data.timeSlotKeys.filter((event, index) => index !== i)
        setData({
            ...data, 
            dates: dateList,
            locations: locationList, 
            beginTimes: beginTimeList,
            endTimes: endTimeList,
            timeSlotKeys: keyList
        })
        
    }
    
    return(
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box mb={4}>
        <Typography variant="h5" pt={3} pl={2}>Create Time Slot(s) for Tutoring Session</Typography>
                
        <Table sx={{ minWidth: 650}}>
        <TableRow>
            <TableCell>
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <MobileDatePicker
                    label="Date"
                    value={eventDetails.date}
                    onChange={(newValue) => {
                        setEventDetails({...eventDetails, date: newValue})
                        setPins({...pins, datePin: true})
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <InputLabel>Location</InputLabel>
                <Input
                    value={eventDetails.location}
                    onChange={(event) => {
                        setEventDetails({...eventDetails, location: event.target.value})
                        if(event.target.value === ""){
                            setPins({...pins, locationPin: false})
                        }else{
                            setPins({...pins, locationPin: true})
                        }
                    }}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl fullWidth sx={{ m: 1 }} variant="filled">
                <MobileTimePicker
                    label="Begin Time"
                    value={eventDetails.beginTime}
                    onChange={(newValue) => {
                        setEventDetails({...eventDetails, beginTime: newValue})
                        setPins({...pins, beginTimePin: true})
                        }
                    }
                    renderInput={(params) => <TextField {...params} />}
                />
                </FormControl>
            </TableCell>
            <TableCell align="right">
                <FormControl required fullWidth sx={{ m: 1 }} variant="filled">
                <MobileTimePicker
                    label="End Time"
                    value={eventDetails.endTime}
                    onChange={(newValue) => {
                        setEventDetails({...eventDetails, endTime: newValue})
                        setPins({...pins, endTimePin: true})
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </FormControl>
            </TableCell>
            
            <TableCell align="right">
                <Fab color="primary" disabled={isDisabled} onClick={handleEventList}>
                    <AddIcon />
                </Fab>
            </TableCell>
        </TableRow>
        </Table>

    {data.timeSlotKeys.length !== 0 ? 
        <Table sx={{ minWidth: 650}} >
        <TableHead>
        <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Location</TableCell>
            <TableCell align="right">Begin Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right"></TableCell>
        </TableRow>
        </TableHead>

        <TableBody>
        {data.timeSlotKeys.map((timeSlotKey, index) => (
            <TableRow key={timeSlotKey} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">{data.dates[index]}</TableCell>
            <TableCell align="right">{data.locations[index]}</TableCell>
            <TableCell align="right">{data.beginTimes[index]}</TableCell>
            <TableCell align="right">{data.endTimes[index]}</TableCell>
            <TableCell align="right">
                <Button variant="contained" color="error" onClick={() => handleRemoveEvent(index)}>Remove</Button>
            </TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
        :
        null
    }
        
        </Box>
        </LocalizationProvider>
        
    )
}


export default TimesLocationsStep