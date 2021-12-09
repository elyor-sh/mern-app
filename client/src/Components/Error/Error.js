import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { AUTH_EDIT, USER_EDIT } from '../../redux/types'
import classes from './Error.module.css'

function Error() {

    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            dispatch({ type: AUTH_EDIT, payload: false })
            dispatch({
                type: USER_EDIT,
                payload: {
                    name: '',
                    email: '',
                    avatar: '',
                    id: ''
                }
            })
            localStorage.clear()
            history.push('/login')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={classes.errorPageContainer}>
            <div className={classes.errorPageWrapper}>
                <h1 className={classes.errorPageTitle}>Not found</h1>
                <h1 className={classes.errorPageTitle}>Error 404</h1>
                <button className={classes.errorBtn} onClick={() => history.push('/')}>Back</button>
            </div>
        </div>
    )
}

export default Error
