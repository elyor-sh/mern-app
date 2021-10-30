import React from 'react'
import classes from './LoginPage.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function LoginPage() {

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className={classes.loginPageContainer}>
            <form className={classes.loginPageWrapper} onSubmit={handleSubmit}>
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

export default LoginPage
