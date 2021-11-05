import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { httpLinkPost } from '../../Api/utils/utils'
import AppBar from '../../AppBar/AppBar'
import classes from './CreateLinkPage.module.css'

function CreateLinkPage() {
    const [link, setLink] = useState('')

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
            .then(res => {
                console.log(res)
            })
            .catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
       
    }, [])
    return (
        <>
            <AppBar />
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