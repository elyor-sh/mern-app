import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import AuthProvider from '../../Api/Auth/AuthProvider'
import { httpLinksGetById } from '../../Api/utils/utils'
import AppBar from '../../AppBar/AppBar'
import classes from './EditLinkPage.module.css'

function EditLinkPage() {
    const [link, setLink] = useState('')

    const history = useHistory()

    useEffect(() => {
        httpLinksGetById(history.location.pathname)
            .then(res => {
                setLink(res.data.items.link)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }, [history.location.pathname])

    return (
        <>
            <AppBar />
            <div className={classes.editLinkPageContainer}>
                <div className={classes.editLinkPageWrapper}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            id="editLink"
                            name="editLink"
                            label="Link"
                            variant="standard"
                            value={link}
                        // onChange={handleChange}
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                        // onClick={handleClick}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.btn}
                            variant="contained"
                        // onClick={handleClick}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditLinkPage