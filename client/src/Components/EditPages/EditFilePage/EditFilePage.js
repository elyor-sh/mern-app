import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import AuthProvider from '../../Api/Auth/AuthProvider'
import { httpFilesGetById, httpFilesPost, httpFilesPut } from '../../Api/utils/utils'
import AppBar from '../../AppBar/AppBar'
import classes from './EditFilePage.module.css'

function EditFilePage() {
    const [idFile, setIdFile] = useState('')
    const [file, setFile] = useState('')

    const history = useHistory()

    const routeParams = useParams()

    const getFile = async () => {
        await httpFilesGetById(routeParams.id)
            .then(res => {
                console.log(res);
                setIdFile(res.data.items._id)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const handleSave = async () => {

        if (!file) {
            alert('Загрузите файл!!!')
            return
        }

        let formData = new FormData()
        formData.append('file', file)

        if(routeParams.id === 'create'){
            await httpFilesPost(formData)
                .then(res => { history.goBack() })
                .catch(err => { AuthProvider.checkError(err) })
            
            return
        }

        formData.append('id', idFile)

        await httpFilesPut(formData)
            .then(() => { history.goBack() })
            .catch(err => { AuthProvider.checkError(err) })
    }

    useEffect(() => {
        if(routeParams.id !== 'create'){
            getFile()
        }
    }, [])

    return (
        <>
            <AppBar />
            <div className={classes.editFilePageContainer}>
                <div className={classes.editFilePageWrapper}>
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            label="Link"
                            variant="standard"
                            type="file"
                            onChange={e => setFile(e.target.files[0])}
                        />
                    </div>
                    <div className={classes.btnBox}>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            style={{ background: '#afa6a6' }}
                            onClick={e => history.goBack()}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.btn}
                            variant="contained"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditFilePage