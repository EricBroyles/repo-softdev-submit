import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { DataGrid } from '@mui/x-data-grid';


//we will have a save changes button, any change will update the data
//if data has been changed from the original then a save button will be enabled, this is in Poeple
//clcik save to push the new data array


  export default function Datagrid({ data, setData, setPageSize, pageSize, columns}){
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCommit = (e) => {
     const array = data.map( item =>{
           if(item.user_id === e.id){
               return{...item, [e.field]: e.value}
           }else{
               return {...item}
           }
       })
       setData(array);
       setSnackbar({ children: 'Data Stored', severity: 'success' });
  }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        getRowId={(row) => row.user_id}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[10, 50, 100]}
        checkboxSelection= {true}
        disableSelectionOnClick
        pagination
        onCellEditCommit={handleCommit}
        
      />
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
    </div>
  );
}





