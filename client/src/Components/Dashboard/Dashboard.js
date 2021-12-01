import React, { useEffect, useState } from 'react'
import AuthProvider from '../Api/Auth/AuthProvider'
import { httpGetUser } from '../Api/utils/utils'
import classes from './Dashboard.module.css'

function Dashboard() {
    const [user, setUser] = useState({})

    const getUser = async () => {
        await httpGetUser()
            .then(res => {
                setUser(res.data.user)
            }).catch(err => {
                AuthProvider.checkError(err)
            })
    }

    useEffect(() => {
        getUser()
    }, [])
    return (
        <>
            <div className={classes.container}>
                {
                    user &&
                    <>
                        <div className={classes.title}>Your Name: </div>
                        <input type={'text'} defaultValue={user.userName} disabled={true} className={classes.input} onChange={e => setUser({...user, userName: e.target.value})}/>
                    </>
                }
            </div>
        </>
    )
}

export default Dashboard
