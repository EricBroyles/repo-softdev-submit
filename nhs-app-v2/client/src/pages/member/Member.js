import React, {Fragment, } from "react"
import { Outlet, useParams } from 'react-router-dom';

//components
import MemberNavbar from "../../components/navigation/navbars/MemberNavbar"


const Member = ({setAuth}) => {
    
    return(
        <Fragment>
            <MemberNavbar setAuth={setAuth}/>
            <Outlet />
            
        </Fragment>
    )
}

export default Member