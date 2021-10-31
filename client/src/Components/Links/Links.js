import React from 'react'
import AppBar from '../AppBar/AppBar'
import classes from './Links.module.css'
import Button from '@mui/material/Button'

function Links() {
    return (
        <>
            <AppBar />
            <div className={classes.pageContainer}>
                <div className={classes.btnWrapper}>
                    <Button variant="contained"
                        type="submit"
                        href="/links/create"
                    >
                        Add Link
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Links
