import React from 'react'
import { Link } from 'react-router-dom'
import { Logo } from '../Logo/Logo'
import Logout from '../Logout/Logout'
import classes from './AppBar.module.css'

function AppBar() {
    return (
        <nav className={classes.navBar}>
            <Link to="/" className={classes.logoWrapper}>
                <Logo />
            </Link>
            <ul className={classes.navBarList}>
                <li className={classes.navBarItem}>
                    <Link to="/links" className={classes.navBarLink}>Links</Link>
                </li>
                <li className={classes.navBarItem}>
                    <Link to="/files" className={classes.navBarLink}>Files</Link>
                </li>
                <li className={classes.navBarItem}>
                    <Link to="/about" className={classes.navBarLink}>About</Link>
                </li>
                <li className={classes.navBarItem}>
                    <Logout/>
                </li>
            </ul>
        </nav>
    )
}

export default AppBar
