import React, { useEffect } from 'react'
import { Button, Card, Divider, Grid, LinearProgress, List, ListItem, makeStyles, Typography } from '@material-ui/core'
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

const ProductScreen = ({ match }) => {
    const classes = useStyles()
    
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [match, dispatch])

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
                            <ListItem>
                                <Button 
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
