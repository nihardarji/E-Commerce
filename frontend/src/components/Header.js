import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, CssBaseline, fade, InputBase, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    }
}))
const Header = () => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    }
    
    const handleClose = () => {
        setAnchorEl(null);
    }

    const logoutHandler = () => {
        handleClose()
        dispatch(logout())
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar style={{backgroundColor: '#2A273C'}} position="static">
                <Toolbar>
                    <Link to='/' className='linkStyle'>
                        <Typography variant="h6" className={classes.title}>
                            E-Commerce App
                        </Typography>
                    </Link>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <Button variant='outlined' color="inherit"> Search</Button>
                    <div className={classes.root}/>
                    <Link to='/cart' className='linkStyle'><Button startIcon={<ShoppingCartIcon/>} color="inherit">Cart</Button></Link>
                    {userInfo ? 
                        <div>
                            <Button startIcon={<AccountCircleIcon/>} onClick={handleMenu} color="inherit" >
                                {userInfo.name} <ArrowDropDownIcon />
                            </Button>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Link to='/profile' className='linkStyle'>Profile</Link>
                                </MenuItem>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                        : 
                        <Link to='/login' className='linkStyle'><Button startIcon={<AccountCircleIcon/>} color="inherit">Login</Button></Link>}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
