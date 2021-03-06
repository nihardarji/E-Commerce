import React, { useEffect } from 'react'
import { Button, Grid, LinearProgress } from '@material-ui/core'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { Link } from 'react-router-dom'

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>  
            <Meta />
            {!keyword ? <ProductCarousel /> 
            : 
                <Link to='/' className='linkStyle'>
                    <Button variant='outlined'>Go Back</Button>
                </Link>
            }
            <h1>Latest Products</h1>
            {loading ? (
                <LinearProgress />
            ) : error ? (
                <Message severity='error' >{error}</Message>
            ) : (
                <>
                    <Grid container spacing={2}>
                        {products.map(product => (
                            <Grid item xs={12} md={4} key={product._id}>
                                <Product product={product} />
                            </Grid>
                        ))}
                    </Grid>
                    <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
                </>
            )}
        </>
    )
}

export default HomeScreen
