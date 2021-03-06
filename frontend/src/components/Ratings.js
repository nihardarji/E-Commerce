import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { Box } from '@material-ui/core'

const Ratings = ({ value, text }) => {
    return (
        <div>
            <Box display="flex" alignItems="center">
                <Rating name="read-only" value={value} precision={0.5} readOnly />
                <Box>{text && text}</Box>
            </Box>
        </div>
    )
}

export default Ratings
