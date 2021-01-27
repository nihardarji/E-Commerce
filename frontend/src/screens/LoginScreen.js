import { Box, Button, Grid, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/Message'

const useStyles = makeStyles(theme => ({
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const LoginScreen = ({ location, history }) => {
    const classes = useStyles()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('') 

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message severity='error'>{error}</Message>}
            {loading && <LinearProgress/>}
            <form onSubmit={submitHandler}>
                <Box py={1}>
                    <InputLabel>Email</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Box>
                <Box py={1}>
                    <InputLabel>Password</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Box>
                <Button size='large' variant='contained' type='submit' style={{ backgroundColor: '#393836', color: '#fff'}} >
                    Sign In
                </Button>
            </form>

            <Grid container spacing={2} className={classes.textfield}>
                <Grid item>
                    New Customer? <Link className='linkStyle' to={redirect ? `/register?redirect=${redirect}` : '/register'}><strong>Register</strong></Link>
                </Grid>
            </Grid>
        </FormContainer>
    )
}

export default LoginScreen
