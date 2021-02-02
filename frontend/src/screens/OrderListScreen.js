import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import Message from '../components/Message'
import CloseIcon from '@material-ui/icons/Close'
import { Link } from 'react-router-dom'
import { listOrders } from '../actions/orderActions'

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
                <TableContainer>
                    <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>ID</strong></TableCell>
                                    <TableCell><strong>USER</strong></TableCell>
                                    <TableCell><strong>DATE</strong></TableCell>
                                    <TableCell><strong>TOTAL</strong></TableCell>
                                    <TableCell><strong>PAID</strong></TableCell>
                                    <TableCell><strong>DELIVERED</strong></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell>{order._id}</TableCell>
                                        <TableCell>{order.user && order.user.name}</TableCell>
                                        <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                                        <TableCell>${order.totalPrice}</TableCell>
                                        <TableCell>{order.isPaid ? order.paidAt.substring(0, 10) : <CloseIcon style={{color:'red'}}/>}</TableCell>
                                        <TableCell>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <CloseIcon style={{color:'red'}}/>}</TableCell>
                                        <TableCell>
                                                <Link to={`/order/${order._id}`} className='linkStyle'>
                                                    <Button variant='contained' style={{ backgroundColor: '#393836', color: '#fff'}}>Details</Button>
                                                </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </TableContainer>
            )}  
        </>
    )
}

export default OrderListScreen
