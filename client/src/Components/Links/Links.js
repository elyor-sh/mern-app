import React, { useEffect, useState } from 'react'
import AppBar from '../AppBar/AppBar'
import classes from './Links.module.css'
import Button from '@mui/material/Button'
import AppTable from '../Organizms/AppTable/AppTable'
import { httpLinksGet } from '../Api/utils/utils'
import AuthProvider from '../Api/Auth/AuthProvider'

function Links() {
    const [items, setItems] = useState([])

    useEffect(() => {

        httpLinksGet()
            .then(res => {
                console.log(res)
                setItems(res.data.items)
            })
            .catch(err => {
                console.log(err)
                AuthProvider.checkError(err)
            })

    }, [])
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
                <AppTable />
            </div>
        </>
    )
}

export default Links
