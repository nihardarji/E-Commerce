import { Box, Button, Card, Divider, Grid, List, ListItem, makeStyles } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'

const useStyles = makeStyles({
    disabledButton:{
        opacity: 0.5
    }
})

const PlaceOrderScreen = ({ history }) => {
    const classes = useStyles()

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    // Calculate prices

    const addDecimal = num => {
        return (Math.round(num * 100)/100).toFixed(2)
    }
    cart.itemsPrice = addDecimal(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    cart.shippingPrice = addDecimal(cart.itemsPrice > 100 ? 0 : 10)
    cart.taxPrice = addDecimal(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])
    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <FormContainer><CheckoutSteps step1 step2 step3 step4 /></FormContainer>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <List>
                        <ListItem>
                            <Box component='div'>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Address: </strong>
                                    {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                                </p>
                            </Box>
                        </ListItem>
                        <Divider/>

                        <ListItem>
                            <Box component='div'>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {cart.paymentMethod}
                                </p>
                            </Box>
                        </ListItem>
                        <Divider/>

                        <ListItem>
                            <Box component='div'>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <List>
                                        {cart.cartItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <Grid container spacing={2}>
                                                    <Grid item md={1}>
                                                        <img src={item.image} alt={item.name} width='100%' height='auto' />
                                                    </Grid>
                                                    <Grid item md>
                                                        <Link to={`/product/${item.product}`} className='linkStyle'>
                                                            {item.name}
                                                        </Link>
                                                    </Grid>
                                                    <Grid item md={4}>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={4}>
                    <Card>
                        <List>
                            <ListItem>
                                <h2>Order Summary</h2>
                            </ListItem>
                            <Divider/>

                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>Items</Grid>
                                    <Grid item xs>${cart.itemsPrice}</Grid>
                                </Grid>
                            </ListItem>

                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>Shipping</Grid>
                                    <Grid item xs>${cart.shippingPrice}</Grid>
                                </Grid>
                            </ListItem>

                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>Tax</Grid>
                                    <Grid item xs>${cart.taxPrice}</Grid>
                                </Grid>
                            </ListItem>

                            <ListItem>
                                <Grid container spacing={2}>
                                    <Grid item xs>Total</Grid>
                                    <Grid item xs>${cart.totalPrice}</Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                {error && <Message severity='error'>{error}</Message>}
                            </ListItem>
                            <ListItem>
                                <Button 
                                    classes={{ disabled: classes.disabledButton}}
                                    style={{ backgroundColor: '#393836', color: '#fff'}}
                                    fullWidth 
                                    variant='contained' 
                                    disabled={cart.cartItems.length === 0} 
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            
        </>
    )
}

export default PlaceOrderScreen
