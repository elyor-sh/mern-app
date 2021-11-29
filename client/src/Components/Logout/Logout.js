import React from 'react'
import Button from '@mui/material/Button'
import { connect } from 'react-redux'
import { editAuth } from '../../redux/actions'
import { useHistory } from 'react-router'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles({
    btn: {
        padding: '0 !important',
        color: '#fff',
        backgroundColor: 'transparent !important',
        boxShadow: 'none !important'
    }
  });

function Logout({ editAuth }) {
    const history = useHistory()
    const classes = useStyles()
    const handleLogout = () => {
        editAuth(false)
        localStorage.clear()
        history.push('/login')
    }
    return (
        <>
            <Button
                variant="contained"
                onClick={handleLogout}
                className={classes.btn}
            >
                Logout
            </Button>

        </>
    )
}

const mapDispatchToProps = {
    editAuth: editAuth
}

export default connect(null, mapDispatchToProps)(Logout)
