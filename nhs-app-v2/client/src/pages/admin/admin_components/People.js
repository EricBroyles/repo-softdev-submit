import * as React from 'react';
import Datagrid from '../../../components/helper/Datagrid'
//MUI Imports
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
//MUI Icons Imports
import SaveIcon from '@mui/icons-material/Save';






function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function a11yProps(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}



async function getUsers(value){
  let type = ""
  if(value === 0){
    type = "members"
  }else if(value === 1){
    type = "students-applying"
  }else if(value === 2){
    type = "sponsors"
  }else{
    type = "students"
  }

  const response = await fetch(`http://localhost:5000/get-user-info/${type}`,{
    method: "GET",
    headers: {token: localStorage.token}
  })
  const parseRes = await response.json()
  return(parseRes)
}

function updateUsers(originalData, data){
  async function update(item){
    try {
      const body = item;
      
        const response = await fetch(
          "http://localhost:5000/update/user-details",
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              token: localStorage.token
            },
            
            body: JSON.stringify(body)
          }
        )
      const parseRes = await response.json();
    } catch (err) {
      console.error(err)
    }
  }
  
  data.forEach((item,index) => {
    if(!(JSON.stringify(item) === JSON.stringify(originalData[index]))){
      update(item)
    }
  });
  

}


export default function People() {
  let firstRender = true
  const [originalUsers, setOriginalUsers] = React.useState([])
  const [users, setUsers] = React.useState([])
  const [pageSize, setPageSize] = React.useState(10);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  React.useEffect(() => {
    async function fetchData(){
      if(firstRender){
        firstRender = false
        setUsers([])
        const theUsers = await getUsers(value)
        
        setOriginalUsers([...theUsers])
        setUsers([...theUsers])
      }else{
        setUsers([])
        const theUsers = await getUsers(value)
        setUsers([...theUsers])
      }
      
    }
    fetchData()
  }, [value])
  

  return (
    <div className="People">

      
      <Box sx={{ width: '100%' }}>
        <Box display="flex" justifycontent="center" sx={{ borderBottom: 1, borderColor: 'divider',marginTop: 8}}>
          <Tabs value={value} onChange={handleChange} aria-label="tabs" justifyContent="center">
            <Tab label="NHS members" {...a11yProps(0)} />
            <Tab label="Applications" {...a11yProps(1)} />
            <Tab label="Event Sponsors" {...a11yProps(2)} />
            <Tab label="Students" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <Button color="primary" onClick={() => updateUsers(originalUsers,users)} >Save Changes<SaveIcon/></Button>

        <TabPanel value={value} index={0}>
          
          <div style={{ height: 600, width: '100%' }}>
            <Datagrid 
              data={users} 
              setData={setUsers} 
              setPageSize={setPageSize} 
              pageSize={pageSize} 
              columns={members}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          
          <div style={{ height: 600, width: '100%' }}>
            <Datagrid 
              data={users} 
              setData={setUsers} 
              setPageSize={setPageSize} 
              pageSize={pageSize} 
              columns={applicants}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          
          <div style={{ height: 600, width: '100%' }}>
            <Datagrid 
              data={users} 
              setData={setUsers} 
              setPageSize={setPageSize} 
              pageSize={pageSize} 
              columns={sponsors}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
          
          <div style={{ height: 600, width: '100%' }}>
            <Datagrid 
              data={users} 
              setData={setUsers} 
              setPageSize={setPageSize} 
              pageSize={pageSize} 
              columns={students}
            />
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}

const members = [
  {field: 'name', width: 200, headerName: 'Name', editable: true, 
  valueGetter: (params) =>`${params.row.first_name || ''} ${params.row.last_name || ''}`, },
  {field: 'complete_tutoring_hrs',width: 125, headerName: 'Tutoring Hours', editable: true},
  {field: 'complete_service_hrs', width: 125, headerName: 'Service Hours', editable: true},
  {field: 'complete_service_proj', width: 130, headerName: 'Service Projects', editable: true},
  {field: 'paid_dues', headerName: 'Paid Dues', editable: true},
  {field: 'grade_level', headerName: 'Grade', editable: true},
  {field: 'role', headerName: 'Role', editable: true},
  {field: 'meetings_attended', headerName: 'Attendance', editable: true},
  {field: 'student_id', headerName: 'Student ID', editable: true},
  {field: 'email',width: 160, headerName: 'Email', editable: true},
]
const students = [
{field: 'name', width: 200, headerName: 'Name', editable: true, 
  valueGetter: (params) =>`${params.row.first_name || ''} ${params.row.last_name || ''}`, },
  {field: 'grade_level', headerName: 'Grade', editable: true},
  {field: 'student_id', headerName: 'Student ID', editable: true},
  {field: 'email',width: 160, headerName: 'Email', editable: true},
]
const sponsors = [
{field: 'name', width: 200, headerName: 'Name', editable: true, 
  valueGetter: (params) =>`${params.row.first_name || ''} ${params.row.last_name || ''}`, },
  {field: 'email',width: 160, headerName: 'Email', editable: true},
  {field: 'birth_date',width: 160, headerName: 'Birth-Date', editable: true},
]
const applicants = [
{field: 'name', width: 200, headerName: 'Name', editable: true, 
  valueGetter: (params) =>`${params.row.first_name || ''} ${params.row.last_name || ''}`, },
  {field: 'email',width: 160, headerName: 'Email', editable: true},
]

