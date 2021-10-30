import React, {useEffect} from 'react'
import classes from './LoginPage.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {connect} from 'react-redux'
import { editAuth } from '../../redux/actions'
import axios from 'axios'

const http = 'http://localhost:5000'

function LoginPage({editAuth}) {

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${http}/api/auth/register`)
    }

    useEffect(() => {
       localStorage.clear() 
    }, [])
    return (
        <div className={classes.loginPageContainer}>
            <form className={classes.loginPageWrapper} onSubmit={handleSubmit}>
                <div className={classes.row}>
                    <p className={classes.title}>Sign in or </p>
                    <a href="/register" className={classes.link}>register</a>
                </div>
                <div className={classes.inputBox}>
                    <TextField className={classes.input} id="name" name="name" label="Name" variant="standard" />
                </div>
                <div className={classes.inputBox}>
                    <TextField className={classes.input} id="email" type="email" name="email" label="Email" variant="standard" />
                </div>
                <div className={classes.inputBox}>
                    <TextField className={classes.input} id="password" name="password" label="Password" variant="standard" />
                </div>
                <div className={classes.btnBox}>
                    <Button className={classes.btn} variant="contained" type="submit">Login</Button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    editAuth: editAuth
}

export default connect(null, mapDispatchToProps)(LoginPage)
