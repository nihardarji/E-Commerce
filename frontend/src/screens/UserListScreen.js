import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, listUsers } from '../actions/userActions'
import { IconButton, LinearProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import Message from '../components/Message'
import CloseIcon from '@material-ui/icons/Close'
import CheckIcon from '@material-ui/icons/Check'
import { Link } from 'react-router-dom'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
    }
    return (
        <>
          <h1>Users</h1>
          {loading ? <LinearProgress/> : error ? <Message severity='error'>{error}</Message> : (
              <Table>
                  <TableHead>
                      <TableRow>
                          <TableCell><strong>ID</strong></TableCell>
                          <TableCell><strong>NAME</strong></TableCell>
                          <TableCell><strong>EMAIL</strong></TableCell>
                          <TableCell><strong>ADMIN</strong></TableCell>
                          <TableCell></TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {users.map(user => (
                          <TableRow key={user._id}>
                              <TableCell>{user._id}</TableCell>
                              <TableCell>{user.name}</TableCell>
                              <TableCell><a className='linkStyle' href={`mailto:${user.email}`}>{user.email}</a></TableCell>
                              <TableCell>{user.isAdmin ? <CheckIcon style={{color:'green'}}/> : <CloseIcon style={{color:'red'}}/>}</TableCell>
                              <TableCell>
                                    <Link to={`/user/${user._id}/edit`} className='linkStyle'>
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </Link>
                                    <IconButton onClick={() => deleteHandler(user._id)}>
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

export default UserListScreen
