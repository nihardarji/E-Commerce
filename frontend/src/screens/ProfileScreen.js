import { Box, Button, Grid, InputLabel, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import Message from '../components/Message'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

const useStyles = makeStyles(theme => ({
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const ProfileScreen = ({ location, history }) => {
    const classes = useStyles()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('') 
    const [message, setMessage] = useState(null) 

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector(state => state.orderListMy)
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if(!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setMessage('Password do not match!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <h2>User Profile</h2>
                {message && <Message severity='error'>{message}</Message>}
                {error && <Message severity='error'>{error}</Message>}
                {success && <Message severity='success'>Profile Updated</Message>}
                {loading && <LinearProgress/>}
                <form onSubmit={submitHandler}>
                    <Box py={1}>
                        <InputLabel>Name</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Email</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Password</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Confirm Password</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </Box>
                    <Button size='large' variant='contained' type='submit' style={{ backgroundColor: '#393836', color: '#fff'}} >
                        Update
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12} md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <LinearProgress/> : errorOrders ? <Message severity='error'>{errorOrders}</Message> : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>DATE</strong></TableCell>
                                    <TableCell><strong>TOTAL</strong></TableCell>
                                    <TableCell><strong>PAID</strong></TableCell>
                                    <TableCell><strong>DELIVERED</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell>{order.totalPrice}</TableCell>
                                        <TableCell>{order.isPaid ? order.paidAt.substring(0,10) : <CloseIcon style={{color:'red'}}/>}</TableCell>
                                        <TableCell>{order.isDelivered ? order.deliveredAt.substring(0,10) : <CloseIcon style={{color:'red'}}/>}</TableCell>
                                        <TableCell>
                                            <Link className='linkStyle' to={`/order/${order._id}`}>
                                                <Button variant='contained' style={{ backgroundColor: '#393836', color: '#fff'}}>Details</Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> 
                    </TableContainer>
                )}
            </Grid>
        </Grid>
    )
}

export default ProfileScreen
