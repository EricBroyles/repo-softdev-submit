import React, {Fragment, } from "react"
import { Outlet } from 'react-router-dom';


//components
import AdminNavbar from "../../components/navigation/navbars/AdminNavbar";


const Admin = ({setAuth}) => {
    
    
    return(
        <Fragment>
            <AdminNavbar setAuth={setAuth}/>
            <Outlet />
        </Fragment>
    )
}

export default Admin