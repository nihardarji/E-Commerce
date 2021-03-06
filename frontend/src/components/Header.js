import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, CssBaseline, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { Link, Route } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'block',
        },
    }
}))
const Header = ({ history }) => {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = useState(null)
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
        history.push('/login')
    }

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar style={{backgroundColor: '#414758'}} position="static">
                <Toolbar>
                    <Link to='/' className='linkStyle'>
                        <Typography variant="h6" className={classes.title}>
                            E-Commerce App
                        </Typography>
                    </Link>
                    <Route render={({ history }) => <SearchBox history={history} />} />
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
                                {userInfo.isAdmin && (
                                    <div>
                                        <Link to='/admin/userlist' className='linkStyle'>
                                            <MenuItem onClick={handleClose}>Users</MenuItem>
                                        </Link>
                                        <Link to='/admin/productlist' className='linkStyle'>
                                            <MenuItem onClick={handleClose}>Products</MenuItem>
                                        </Link>
                                        <Link to='/admin/orderlist' className='linkStyle'>
                                            <MenuItem onClick={handleClose}>Orders</MenuItem>
                                        </Link>
                                    </div>
                                )}
                                <Link to='/profile' className='linkStyle'>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>
                                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                            </Menu>
                        </div>
                        : 
                        <Link to='/login' className='linkStyle'><Button startIcon={<AccountCircleIcon/>} color="inherit">Login</Button></Link>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header
