import React, { useEffect, useState } from 'react'
import { Button, Card, Divider, FormControl, Grid, InputLabel, LinearProgress, List, ListItem, makeStyles, MenuItem, Select, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Ratings from '../components/Ratings'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Message from '../components/Message'

const useStyles = makeStyles(theme => ({
    grid: {
        marginTop: theme.spacing(1) 
    },
    disabledButton:{
        opacity: 0.5
    }
}))

const ProductScreen = ({ match, history }) => {
    const classes = useStyles()
    const [qty, setQty] = useState(1)
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <>
            <Link to='/' className='linkStyle'>
                <Button variant='outlined'>Go Back</Button>
            </Link>
            {loading ? 
                <LinearProgress/>
            : error ? 
                <Message severity='error' /> 
            : 
            <Grid className={classes.grid} container spacing={2}>
                <Grid item xs={12} md={6}>
                    <img src={product.image} alt={product.name} width='100%' height='auto' />
                </Grid>
                <Grid item xs={6} md={3}>
                    <List>
                        <ListItem>
                            <Typography variant='h5' component='h3' >{product.name}</Typography>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            Price: ${product.price}
                        </ListItem>
                        <Divider/>
                        <ListItem>
                            Description: {product.description}
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={6} md={3}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid item xs={6}>
                                    Price:
                                </Grid>
                                <Grid item xs={6}>
                                    ${product.price}
                                </Grid>
                            </ListItem>
                            <Divider/>
                            <ListItem>
                                <Grid item xs={6}>
                                    Status:
                                </Grid>
                                <Grid item xs={6}>
                                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                </Grid>
                            </ListItem>
                            <Divider/>
                            {product.countInStock > 0 && (
                                <ListItem>
                                    <Grid item xs={6}>
                                        Qty:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth size='small'>
                                            <Select
                                                value={qty}
                                                onChange={(e) => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <MenuItem key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </ListItem>
                            )}
                            <ListItem>
                                <Button 
                                    onClick={addToCartHandler}
                                    classes={{ disabled: classes.disabledButton}} 
                                    style={{ backgroundColor: '#393836', color: '#fff'}} 
                                    fullWidth 
                                    variant='contained' 
                                    disabled={product.countInStock === 0} 
                                >
                                    Add To Cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            }
        </>
    )
}

export default ProductScreen
