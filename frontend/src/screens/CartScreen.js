import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
import { Button, Card, FormControl, Grid, IconButton, List, ListItem, makeStyles, MenuItem, Select } from '@material-ui/core'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    disabledButton:{
        opacity: 0.5
    }
})

const CartScreen = ({ match, location, history }) => {
    const classes = useStyles()
    const productId = match.params.id

    // to get query params use location.search
    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <Message> Your cart is empty <Link className='linkStyle' to='/'>Go Back</Link></Message>
                ) : (
                    <List>
                        {cartItems.map(item => (
                            <ListItem key={item.product}>
                                <Grid container spacing={3}>
                                    <Grid item xs={2}>
                                        <img src={item.image} alt={item.name} width='100%' height='auto' />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Link className='linkStyle' to={`/product/${item.product}`}>{item.name}</Link>
                                    </Grid>
                                    <Grid item xs={2}>
                                        ${item.price}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormControl fullWidth size='small'>
                                            <Select
                                                value={item.qty}
                                                onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                                            >
                                                {[...Array(item.countInStock).keys()].map(x => (
                                                    <MenuItem key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton onClick={() => removeFromCartHandler(item.product)}><DeleteIcon/></IconButton>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                    </List>
                )}
            </Grid>
            <Grid item xs={12} md={4}>
                <Card>
                    <List>
                        <ListItem>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                            </h2>
                        </ListItem>
                        <ListItem>
                            ${cartItems
                                .reduce((acc, item) => acc + item.qty * item.price, 0)
                                .toFixed(2)
                            }
                        </ListItem>
                        <ListItem>
                            <Button 
                                fullWidth 
                                disabled={cartItems.length === 0} 
                                onClick={checkOutHandler}
                                classes={{ disabled: classes.disabledButton}}
                                style={{ backgroundColor: '#393836', color: '#fff'}} 
                            > 
                                Proceed to Checkout
                            </Button>
                        </ListItem>
                    </List>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CartScreen
