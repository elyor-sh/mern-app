import React, {useEffect, useState} from 'react'
import classes from './RegistrationPage.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {httpGetClientAddress, httpRegisterPost } from '../Api/utils/utils'
import {useHistory} from 'react-router'
import AuthProvider from '../Api/Auth/AuthProvider'

function RegistrationPage() {
    const [value, setValue] = useState({
        name: '',
        email: '',
        password: '',
    })

    const [avatar, setAvatar] = useState('')
    const [address, setAddress] = useState('[]')

    const handleChange = (e) => {
        let val = e.target.value
        let nam = e.target.name
        setValue({...value, [nam]: val})
    }

    const handleChangeFile = (e) => {
        setAvatar(e.target.files[0])
    }

    const history = useHistory()

    const handleSubmit = (e) => {

        e.preventDefault()

        // забираем параметры из строки запроса
        const params = (new URL(document.location)).searchParams;
        if(!params || !params.get('key') || !params.get('email')){
            alert('Confirm your email')
            return
        }

        const formData = new FormData();
        if(avatar){
            formData.append('avatar', avatar)
        }
        formData.append('name', value.name)
        formData.append('email', params.get('email'))
        formData.append('uniqueKey', params.get('key'))
        formData.append('password', value.password)
        formData.append('clientAddress', address)
       
        httpRegisterPost(formData)
            .then(res => {
                history.push('/login')
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
                            id="password"
                            name="password"
                            label="Password"
                            variant="standard" 
                            onChange={handleChange}
                            />
                    </div>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="avatar"
                            name="avatar"
                            label="Avatar"
                            type="file"
                            variant="standard" 
                            onChange={handleChangeFile}
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