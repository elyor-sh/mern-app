import React, { useEffect, useState} from 'react'
import classes from './LoginPage.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { connect } from 'react-redux'
import { editAuth } from '../../redux/actions'
import { httpLoginPost } from '../Api/utils/utils'
import { useHistory } from 'react-router'

function LoginPage({ editAuth }) {

    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const history = useHistory()

    const handleChange = (e) => {
        let val = e.target.value
        let nam = e.target.name
        setValue({...value, [nam]: val})
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        httpLoginPost(value)
            .then(res => {
                console.log(res);
                let currentUser = {
                    userId: res.data.userId,
                    userName: res.data.userName
                }
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('currentUser', JSON.stringify(currentUser))
                editAuth(true)
                history.push('/')
            })
            .catch(err => {
                console.log(err);
            })
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
                    <TextField
                        className={classes.input}
                        id="name"
                        name="name"
                        label="Name"
                        variant="standard" 
                        onChange={handleChange}
                        />
                </div>
                <div className={classes.inputBox}>
                    <TextField
                        className={classes.input}
                        id="email"
                        type="email"
                        name="email"
                        label="Email"
                        variant="standard" 
                        onChange={handleChange}
                        />
                </div>
                <div className={classes.inputBox}>
                    <TextField
                        className={classes.input}
                        id="password"
                        name="password"
                        label="Password"
                        variant="standard" 
                        onChange={handleChange}
                        />
                </div>
                <div className={classes.btnBox}>
                    <Button
                        className={classes.btn}
                        variant="contained"
                        type="submit">
                        Login
                    </Button>
                </div>
            </form>
        </div>
    )
}

const mapDispatchToProps = {
    editAuth: editAuth
}

export default connect(null, mapDispatchToProps)(LoginPage)
