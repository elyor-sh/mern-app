import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import AuthProvider from '../../Api/Auth/AuthProvider'
import { httpLinkPost } from '../../Api/utils/utils'
import { useToaster } from '../../hooks/useToaster'
import classes from './CreateLinkPage.module.css'

function CreateLinkPage() {
    const [link, setLink] = useState('')
    const history = useHistory()

    const handleChange = (e) => {
        setLink(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        const now = new Date()
        const params = {
            link: link,
            date: now
        }
        httpLinkPost(params)
            .then((res) => {
                useToaster(res.data.message, 'success')
                history.go(-1)
            })
            .catch(e => {
                AuthProvider.checkError(e)
            })
    }

    return (
        <>
            <div className={classes.createLinkPageContainer}>
                <div className={classes.createLinkPageWrapper}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="linkCreate"
                            name="linkCreate"
                            label="Link"
                            variant="standard"
                            value={link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            onClick={handleClick}
                        >
                           Create Link 
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateLinkPage