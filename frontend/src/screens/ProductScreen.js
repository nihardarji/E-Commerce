import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, LinearProgress, List, ListItem, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Ratings from '../components/Ratings'
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const useStyles = makeStyles(theme => ({
    grid: {
        marginTop: theme.spacing(1) 
    },
    disabledButton:{
        opacity: 0.5
    },
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    card:{
        width: '100%'
    }
}))

const ProductScreen = ({ match, history }) => {
    const classes = useStyles()

    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const { success: successProductReview, error: errorProductReview } = productReviewCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(successProductReview){
            alert('Review submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch, successProductReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, {
            rating, 
            comment
        }))
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
            : (
                <>
                    <Grid className={classes.grid} container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <img src={product.image} alt={product.name} width='100%' height='auto' />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
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
                        <Grid item xs={12} sm={6} md={3}>
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No reviews</Message>}
                            <List>
                                {product.reviews.map(review => (
                                    <ListItem key={review._id}>
                                        <Card className={classes.card}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar>{review.name.substring(0, 1)}</Avatar>
                                                }
                                                title={review.name}
                                                subheader={`Reviewed at ${review.createdAt.substring(0, 10)}`}
                                            />
                                            <CardContent>
                                                <Ratings value={review.rating} />
                                                <p>{review.comment}</p>
                                            </CardContent>
                                        </Card>
                                    </ListItem>
                                ))}
                                <ListItem>
                                    <div style={{width:'100%'}}>
                                    <h2>Write a Review</h2>
                                    {errorProductReview && <Message severity='error'>{errorProductReview}</Message>}
                                    {userInfo ? (
                                        <form onSubmit={submitHandler}>
                                            <Box py={1}>
                                                <InputLabel>Rating</InputLabel>
                                                <FormControl className={classes.textfield} fullWidth size='small'>
                                                    <Select
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <MenuItem value='0'><em>Select</em></MenuItem>
                                                        <MenuItem value='1'>1 - Poor</MenuItem>
                                                        <MenuItem value='2'>2 - Fair</MenuItem>
                                                        <MenuItem value='3'>3 - Good</MenuItem>
                                                        <MenuItem value='4'>4 - Very Good</MenuItem>
                                                        <MenuItem value='5'>5 - Excellent</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            <Box py={1}>
                                                <InputLabel>Comment</InputLabel>
                                                <TextField 
                                                    className={classes.textfield} 
                                                    fullWidth 
                                                    multiline
                                                    rows={3}
                                                    variant='outlined' 
                                                    type='email' 
                                                    placeholder='Enter comment' 
                                                    value={comment} 
                                                    onChange={(e) => setComment(e.target.value)} 
                                                />
                                            </Box>
                                            <Button size='large' variant='contained' type='submit' style={{ backgroundColor: '#393836', color: '#fff'}} >
                                                Submit
                                            </Button>
                                        </form>
                                    ) : (
                                        <Message>Please <Link to='/login' className='linkStyle'><strong>Sign In</strong></Link> to write a review</Message>
                                    )}
                                    </div>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    )
}

export default ProductScreen
