import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import { Logo } from '../Logo/Logo'
import Avatar from '../Avatar/Avatar'
import classes from './AppBar.module.css'

function AppBar() {

    const [open, setOpen] = useState(false)

    const isSmall = useMediaQuery('(max-width:576px)');

    const handleBurgerClick = () => {
        setOpen(prev => !prev)
    }

    return (
        <nav className={classes.navBar}>
            <div className="container">
                <div className={classes.navBarRow}>
                    <Link to="/" className={classes.logoWrapper}>
                        <Logo />
                    </Link>
                    {
                        isSmall &&
                        <div className={classes.burgerBtn} onClick={handleBurgerClick}>
                            <MenuIcon style={{ pointerEvents: 'none', color: '#fff' }} />
                        </div>
                    }
                    <ul className={`${classes.navBarList} ${open && classes.open}`}>
                        <li className={classes.navBarItem}>
                            <Link to="/" className={classes.navBarLink}>Home</Link>
                        </li>
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
                            <Avatar />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default AppBar
