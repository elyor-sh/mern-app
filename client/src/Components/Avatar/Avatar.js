import React, { useState } from 'react'
import { API_URI } from '../../config/config'
import AvatarIcon from '../../assets/avatarIcon.jpg'
import classes from './Avatar.module.css'
import Logout from '../Logout/Logout'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'

function Avatar() {

    const history = useHistory()

    const currentUser = useSelector((state) => state.auth.user)

    const [showButton, setShowButton] = useState(false)
    const [imgError, setImgError] = useState(false)

    const handleClick = () => {
        setShowButton(prev => {
            return !prev
        })
    }

    document.body.addEventListener('click', e => {
        const element = e.target
        if (!element.closest('#avatar') && !element.closest('#userMenu') && showButton) {
            setShowButton(false)
        }
    })

    const handleAccountClick = () => {
        setShowButton(false)
        history.push('/userProfile')
    }

    return (
        <div className={classes.container}>
            <div id="avatar" className={classes.imgContainer} onClick={handleClick}>
                {
                    imgError ?
                        <img src={AvatarIcon} style={{ width: '100%', height: '100%' }} alt={"avatar"} />
                        :
                        <img 
                            src={currentUser.avatar ? (API_URI + currentUser.avatar) : AvatarIcon} 
                            style={{ width: '100%', height: '100%' }} alt={"avatar"} 
                            onError={() => setImgError(true)}
                        />
                }
            </div>
            <div id="userMenu" className={`${showButton ? classes.btnShow : ''} ${classes.btn}`}>
                <div className={`${classes.back} row jcsb aic`}>
                    <div className={`row aic`}>
                        <div className={classes.imgContainer}>
                            {
                                imgError ?
                                    <img src={AvatarIcon} style={{ width: '100%', height: '100%' }} alt={"avatar"} />
                                    :
                                    <img 
                                        src={currentUser.avatar ? (API_URI + currentUser.avatar) : AvatarIcon} 
                                        style={{ width: '100%', height: '100%' }} alt={"avatar"} 
                                        onError={() => setImgError(true)}
                                    />
                            }
                        </div>
                        <div className={`${classes.userDatas}`}>
                            <div>{currentUser.name}</div>
                            <div>{currentUser.email}</div>
                        </div>
                    </div>
                    <div className={classes.btnLogout}>
                        <Logout />
                    </div>
                </div>
                <div className={classes.btnUserMenu} onClick={handleAccountClick}>
                    My Account
                </div>
            </div>
        </div>
    )
}

export default Avatar
