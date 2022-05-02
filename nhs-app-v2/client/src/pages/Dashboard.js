//TO BE REMOVED UPON REPLACEMENT



import React, { Fragment, useState, useEffect } from "react";
import Button from '@mui/material/Button';
import { toast } from "react-toastify";

const Dashboard = ({setAuth}) => {
    
    const [name, setName] = useState("")

    async function getName(){
        try {
            const response = await fetch("http://localhost:5000/dashboard/",{
                method: "GET",
                headers: {token: localStorage.token}
            })

            const parseRes = await response.json()
            setName(parseRes.user_name)
        } catch (err) {
            console.log(err.message)
        }
    }
    const logout = (e) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
        toast.success("Logged out Successfully")
    }

    useEffect(()=> {
        getName()
    }, [])
    return(
        <Fragment>
            <h1>Dashboard {name}</h1>
            <Button onClick={logout} >Logout</Button>
        </Fragment>
    )
}
export default Dashboard