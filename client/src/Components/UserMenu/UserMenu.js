import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import { useHistory } from 'react-router'
import { connect } from 'react-redux'
import classes from './UserMenu.module.css'
import { httpDeleteUserAvatar, httpPostUserAvatar, httpPutUser, httpPutUserAvatar } from '../Api/utils/utils'
import AuthProvider from '../Api/Auth/AuthProvider'
import setLocalStorage from '../hooks/setLocalStorage'
import { editUser } from '../../redux/actions'
import { useToaster } from '../hooks/useToaster'

function UserMenu({currentUser, editUser}) {

    const history = useHistory()

    const setToaster = useToaster

    const [typeRequest, setTypeRequest] = useState('put')

    const [user, setUser] = useState({
        name: currentUser.name,
        oldEmail: currentUser.email,
        newEmail: currentUser.email,
        id: currentUser.id
    })

    const [avatar, setAvatar] = useState('')

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const userEditRedux = user => {
        const userRedux = {
            id: user.userId,
            name: user.userName,
            avatar: user.avatar,
            email: user.userEmail
        }

        editUser(userRedux)
    }

    const editAvatar = async () => {

        let formData = new FormData()
        formData.append('avatar', avatar)

        if (typeRequest === 'post') {
            await httpPostUserAvatar(formData)
                .then(res => {
                    setLocalStorage(res.data.user)
                    userEditRedux(res.data.user)
                    setToaster(res.data.message, 'success')
                }).catch(err => {
                    console.log(err);
                    AuthProvider.checkError(err)
                })
            return
        }

        formData.append('id', user.id)

        await httpPutUserAvatar(formData)
            .then(res => {
                setLocalStorage(res.data.user)
                userEditRedux(res.data.user)
                setToaster(res.data.message, 'success')
            }).catch(err => {
                console.log(err);
                AuthProvider.checkError(err)
            })
    }

    const handleSave = async () => {
        await httpPutUser(user)
            .then(res => {
                if (avatar) {
                    editAvatar()
                } else {
                    setToaster(res.data.message, 'success')
                    setLocalStorage(res.data.user)
                    userEditRedux(res.data.user)
                }
            }).catch(err => {
                AuthProvider.checkError(err)
            })
    }

    const deleteAvatar = async () => {
        await httpDeleteUserAvatar(user.id)
            .then(res => {
                setLocalStorage(res.data.user)
                userEditRedux(res.data.user)
                setTypeRequest('post')
                setToaster(res.data.message, 'success')
            }).catch(err => {
                AuthProvider.checkError(err)
            })
    }

    useEffect(() => {
        currentUser.avatar ? setTypeRequest('put') : setTypeRequest('post')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className={classes.containerUserMenu}>
                <div className={classes.title}>Edit datas:</div>
                <div className={classes.inputWrapper}>
                    <TextField
                        className={classes.input}
                        id="name"
                        name="name"
                        label="Name"
                        variant="standard"
                        value={user.name}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        className={classes.input}
                        id="newEmail"
                        name="newEmail"
                        label="Email"
                        variant="standard"
                        value={user.newEmail}
                        onChange={handleChange}
                    />
                </div>
                <div className={classes.inputWrapper}>
                    <TextField
                        className={classes.input}
                        id="avatar"
                        name="avatar"
                        label="Avatar"
                        variant="standard"
                        type="file"
                        onChange={e => setAvatar(e.target.files[0])}
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
                        style={{ background: '#e94200' }}
                        onClick={deleteAvatar}
                    >
                        Delete Avatar
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
        </>
    )
}

const mapStateToProps = state => {
    return {
        currentUser: state.auth.user
    }
  }
  
  const mapDispatchToProps = {
    editUser: editUser
  }

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu)