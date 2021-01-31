import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, InputLabel, LinearProgress, makeStyles, TextField } from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, updateProduct } from '../actions/productActions'
import Message from '../components/Message'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const useStyles = makeStyles(theme => ({
    textfield: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}))

const ProductEditScreen = ({ match, history }) => {
    const classes = useStyles()

    const productId = match.params.id

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate

    useEffect(() => {
        if(successUpdate){
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if(!product.name || product._id !== productId){
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
            }
        }
    }, [product, productId, dispatch, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config= {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(true)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            brand,
            category, 
            description,
            image,
            countInStock
        }))
    }

    return (
        <>
            <Box my={2}><Link to='/admin/productlist' className='linkStyle'><Button variant='outlined'>Go Back</Button></Link></Box>
            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <LinearProgress/>}
                {errorUpdate && <Message severity='error'>{errorUpdate}</Message>}
                {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
                    <form onSubmit={submitHandler}>
                    <Box py={1}>
                        <InputLabel>Name</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Price</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Image</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)} />
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='file' placeholder='Enter image url' onChange={uploadFileHandler} />
                        {uploading && <LinearProgress/>}
                    </Box>
                    <Box py={1}>
                        <InputLabel>Brand</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Count In Stock </InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='number' placeholder='Enter count in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Category</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Box>
                    <Box py={1}>
                        <InputLabel>Description</InputLabel>
                        <TextField className={classes.textfield} fullWidth variant='outlined' type='text' placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)} />
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

export default ProductEditScreen
