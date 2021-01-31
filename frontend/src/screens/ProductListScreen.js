import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Grid, IconButton, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import Message from '../components/Message'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Paginate from '../components/Paginate'

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if(!userInfo.isAdmin){
            history.push('/login')
        } 
        if(successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }

    }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteProduct(id))
        }
    }

    const createProductHandler = () => {
        dispatch(createProduct())
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
                            onClick={createProductHandler}
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
            {loadingCreate && <LinearProgress/>}
            {errorCreate && <Message severity='error'>{errorCreate}</Message>}
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
                <>
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
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}  
        </>
    )
}

export default ProductListScreen
