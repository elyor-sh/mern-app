import React from 'react'
import { Logo } from '../Logo/Logo'
import classes from './AppBar.module.css'

function AppBar() {
    return (
        <nav className={classes.navBar}>
            <a href="/" className={classes.logoWrapper}>
                <Logo />
            </a>
            <ul className={classes.navBarList}>
                <li className={classes.navBarItem}>
                    <a href="/links" className={classes.navBarLink}>Links</a>
                </li>
                <li className={classes.navBarItem}>
                    <a href="/files" className={classes.navBarLink}>Files</a>
                </li>
            </ul>
        </nav>
    )
}

export default AppBar
