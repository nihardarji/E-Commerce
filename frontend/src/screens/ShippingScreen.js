import React, { useState } from 'react'
import FormContainer from '../components/FormContainer'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, InputLabel, makeStyles, TextField } from '@material-ui/core'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const useStyles = makeStyles(theme => ({
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const ShippingScreen = ({ history }) => {

    const classes = useStyles()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <form onSubmit={submitHandler}>
                <Box py={1}>
                    <InputLabel>Address</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Box>
                <Box py={1}>
                    <InputLabel>City</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter city' value={city} onChange={(e) => setCity(e.target.value)} required />
                </Box>
                <Box py={1}>
                    <InputLabel>Postal Code</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter postal code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </Box>
                <Box py={1}>
                    <InputLabel>Country</InputLabel>
                    <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Box>
                <Button size='large' variant='contained' type='submit' style={{ backgroundColor: '#393836', color: '#fff'}} >
                    Continue
                </Button>
            </form>
        </FormContainer>
    )
}

export default ShippingScreen
