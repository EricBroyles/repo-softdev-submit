import * as React from 'react';
//MUI Imports
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
//MUI Icons

export default function MemberIssueCard({id, details, issueList, setIssueList}){
    const[newTagDisplay, setNewTagDisplay] = React.useState('display')
    const handleNewTagDisplay = () => {
      if(newTagDisplay === 'display'){
        setNewTagDisplay('none')
      }
    }
    const handleClick = async() => { 
      let body = {issue_id: id, status: details.status}
      if(details.status === null){
        body = {...body, status: false}
      }else{
        body = {...body, status: true}
      }
      
      const list = []
      
        issueList.map((issue) => {
          console.log(issue.issue_id)
          if(issue.issue_id === id){
            if(!body.status){
              list.push({...issue, status: body.status})
            }
          }else{
            list.push(issue)
          }
        })
      
      setIssueList([...list])
      
      try {
        const response = await fetch("http://localhost:5000/update-issues/issue-status",{
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            token: localStorage.token
          },
          body: JSON.stringify(body)
        })


      } catch (err) {
        console.error(err)
      }
    }
    React.useEffect(() => {
      if(details.status !== null){
        setNewTagDisplay('none')
      }
    },[])
    
    return(
        <Card elevation={5} onClick = {handleNewTagDisplay} sx={{ padding: 2, marginBottom: 2}}>
          <Alert severity="warning">
          <Stack direction="column" spacing= {1}>
            <Stack direction="row" spacing={1}>
              <Typography variant="h5">Member Issue {details.issue_type} </Typography>
              <Typography variant="h5">From: {details.name}, {details.email}</Typography>
              <Chip label="New" color="warning" sx={{display: newTagDisplay}}/>
            </Stack>
            <Typography variant="b1">{details.content}</Typography>
            <Typography variant="b2">submitted on: {details.date}</Typography>
            <Typography variant="b2">Current Status: {details.status === null ? "submitted" : "in review"} </Typography>
            <Stack direction="row">
              <Button>Reply</Button>
              {/* this does not get all the already completed issues ie true , not false means in review*/}
              <Button onClick={handleClick}>Click to progress to: {details.status === false ? "resolved" : "in review"}</Button>
            </Stack>
          </Stack>
            </Alert>
        </Card>
    )
}