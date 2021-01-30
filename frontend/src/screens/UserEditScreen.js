import { Box, Button, Checkbox, FormControlLabel, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../actions/userActions'
import Message from '../components/Message'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const useStyles = makeStyles(theme => ({
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const UserEditScreen = ({ match, history }) => {
    const classes = useStyles()

    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if(!user.name || user._id !== userId){
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }   
        }
    }, [user, userId, dispatch, successUpdate, history])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Box my={2}><Link to='/admin/userlist' className='linkStyle'><Button variant='outlined'>Go Back</Button></Link></Box>
            <FormContainer>
                <h1>Edit user</h1>
                {loadingUpdate && <LinearProgress/>}
                {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
                {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
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
                    <FormControlLabel
                        control={<Checkbox checked={isAdmin} color='primary' onChange={(e) => setIsAdmin(e.target.checked)} name="isAdmin" />}
                        label="Is Admin"
                    />
                    </Box>
                    <Button size='large' variant='contained' type='submit' style={{ backgroundColor: '#393836', color: '#fff'}} >
                        Update
                    </Button>
                </form>
                )}
            </FormContainer>
        </>
    )
}

export default UserEditScreen
