import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import classes from '../RegistrationPage/RegistrationPage.module.css'
import { httpCheckRegisterPost, httpGetClientAddress } from '../Api/utils/utils';
import AuthProvider from '../Api/Auth/AuthProvider';
import { useHistory } from 'react-router';

function CheckRegister() {

    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('[]')
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!email.trim()){
            alert('Email must not be empty!')
            return
        }

        const params = {
            email: email,
            url: `${window.location.origin}/checkRegister`,
            clientAddress: address
        }

        await httpCheckRegisterPost(params)
            .then(res => {
                history.push('/checkRegister')
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })

    }

    const getClientAddress = async () => {
        await httpGetClientAddress()
          .then(res => {
            setAddress(JSON.stringify(res.data))
          }).catch(err => {
            console.log(err)
          })
    }

    useEffect(() => {
        getClientAddress()
    }, [])

    return (
        <div>
            <div className={classes.registerPageContainer}>
                <form className={classes.registerPageWrapper} onSubmit={handleSubmit}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="emailCheck" type="email"
                            name="emailCheck" label="Email"
                            variant="standard"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            type="submit"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CheckRegister;