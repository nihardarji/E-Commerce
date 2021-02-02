import React from 'react'
import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import { Box } from '@material-ui/core'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
    return pages > 1 && (
        <Box mt={2} mb={4} display='flex' justifyContent='center'>
            <Pagination 
                color='primary'
                page={page}
                count={pages}
                renderItem={(x) => (
                    <PaginationItem
                        component={Link}
                        to={
                            !isAdmin ? 
                            keyword ? 
                                `/search/${keyword}/page/${x.page}` 
                            : 
                                `/page/${x.page}` 
                            : 
                                `/admin/productlist/${x.page}`
                        }
                        {...x}
                    />
                )}
            />
        </Box>
    )
}

export default Paginate
