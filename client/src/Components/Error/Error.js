import React, { useEffect } from 'react'
import { useHistory } from 'react-router'

function Error() {

    const history = useHistory()

    useEffect(() => {
        if(!localStorage.getItem('token')) history.push('/login')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div>
                Error 404
                <a href="/login">Login</a>
            </div>
        </>
    )
}

export default Error
