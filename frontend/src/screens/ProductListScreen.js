import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add';
import { deleteProduct, listProducts } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listProducts())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs>
                    <h1>Products</h1>
                </Grid>
                <Grid item xs container justify='flex-end' alignItems='center'>
                    <Grid>
                        <Button 
                            variant='contained' 
                            style={{ backgroundColor: '#393836', color: '#fff'}} 
                            startIcon={<AddIcon/>}
                        >
                            Create Product
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            {loadingDelete && <LinearProgress/>}
            {errorDelete && <Message severity='error'>{errorDelete}</Message>}
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>NAME</strong></TableCell>
                            <TableCell><strong>PRICE</strong></TableCell>
                            <TableCell><strong>CATEGORY</strong></TableCell>
                            <TableCell><strong>BRAND</strong></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map(product => (
                            <TableRow key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>
                                        <Link to={`/admin/product/${product._id}/edit`} className='linkStyle'>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                        </Link>
                                        <IconButton onClick={() => deleteHandler(product._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}  
        </>
    )
}

export default ProductListScreen
