import React, {useState} from 'react'
import classes from './RegistrationPage.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios'
import { httpRegisterPost } from '../Api/utils/utils'

function RegistrationPage() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        let val = e.target.value
        let nam = e.target.name
        setValue({...value, [nam]: val})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        httpRegisterPost(value)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>

            <div className={classes.registerPageContainer}>
                <form className={classes.registerPageWrapper} onSubmit={handleSubmit}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="name" name="name"
                            label="Name"
                            variant="standard"
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="email" type="email"
                            name="email" label="Email"
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
                            type="submit"
                        >
                            Register
                        </Button>
                    </div>
                </form>
            </div>


        </>
    )
}

export default RegistrationPage