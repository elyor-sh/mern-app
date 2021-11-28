import React, { useEffect, useState } from 'react'
import { API_URI } from '../../config/config'

function Avatar() {

    const [avatarSrc, setAvatarSrc] = useState('')
    useEffect(() => {
        if(JSON.parse(localStorage.getItem('currentUser'))){
            const avatarUri = JSON.parse(localStorage.getItem('currentUser')).userAvatar
            setAvatarSrc(API_URI + avatarUri)
        }
    }, [])

    return (
        <div style={{width: '35px', height: '35px', borderRadius: '50%', overflow: 'hidden'}}>
           <img src={avatarSrc} style={{width: '100%', height: '100%'}}/> 
        </div>
    )
}

export default Avatar
