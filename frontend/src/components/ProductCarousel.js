import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, LinearProgress, Typography } from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import { listTopProducts } from '../actions/productActions'
import Message from './Message'

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated = useSelector(state => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
        <Carousel animation='slide' autoPlay={false}>
            {products.map(product => (
                <Box key={product._id} display='flex' justifyContent='center' className='carousel-style'>
                    <Link to={`/product/${product._id}`} className='linkStyle'>
                        <Box>
                            <h2 className='casousel-caption'>{product.name}</h2>
                            <img src={product.image} alt={product.name} className='carousel-img' />
                        </Box>
                    </Link>
                </Box>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
