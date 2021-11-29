import React, { useEffect, useState } from 'react'
import AppBar from '../AppBar/AppBar'
import classes from './Dashboard.module.css'

function Dashboard() {
    const [user, setUser] = useState({})

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        console.log(currentUser);
        setUser(currentUser)
    }, [])
    return (
        <>
            <AppBar />
            <div className={classes.container}>
                {
                    user &&
                    <>
                        <div className={classes.title}>Your Name: </div>
                        <input type={'text'} value={user.userName} disabled={true} className={classes.input}/>
                    </>
                }
            </div>
        </>
    )
}

export default Dashboard
