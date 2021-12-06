import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import AuthProvider from '../../Api/Auth/AuthProvider'
import { httpFilesGetById, httpFilesPost, httpFilesPut } from '../../Api/utils/utils'
import { useToaster } from '../../hooks/useToaster'
import classes from './EditFilePage.module.css'

function EditFilePage() {
    const [idFile, setIdFile] = useState('')
    const [file, setFile] = useState('')
    const [description, setDescription] = useState('')

    const history = useHistory()

    const routeParams = useParams()

    const getFile = async () => {
        await httpFilesGetById(routeParams.id)
            .then(res => {
                setIdFile(res.data.items._id)
                setDescription(res.data.items.description)
            })
            .catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const setToaster = useToaster

    const handleSave = async () => {

        if (!file) {
            alert('Загрузите файл!!!')
            return
        }

        let formData = new FormData()
        formData.append('file', file)
        formData.append('description', description)

        if(routeParams.id === 'create'){
            await httpFilesPost(formData)
                .then(res => { 
                    setToaster(res.data.message, 'success')
                    history.goBack() 
                })
                .catch(err => { 
                    AuthProvider.checkError(err) 
                })
            
            return
        }

        formData.append('id', idFile)

        await httpFilesPut(formData)
            .then((res) => { 
                setToaster(res.data.message, 'success')
                history.goBack() 
            })
            .catch(err => { 
                AuthProvider.checkError(err) 
            })
    }

    useEffect(() => {
        if(routeParams.id !== 'create'){
            getFile()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
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
                    <div className={classes.inputBox}>
                        <TextField
                            className={classes.input}
                            label="Description"
                            variant="standard"
                            type="text"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
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