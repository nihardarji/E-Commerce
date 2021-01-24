import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Ratings from './Ratings'

const useStyles = makeStyles({
    root: {
        height:'100%',
        width:'100%',
        display: 'flex',
        flexDirection: 'column'
    },
    media: {
        width: '100%',
    }
})

const Product = ({ product }) => {

    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={product.image}
                    title={product.name}
                    component='img'
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h5">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component='div'>
                        <Ratings value={product.rating} text={`${product.numReviews} reviews`}/>
                    </Typography>
                    <Typography variant="h6" component="h5">
                        ${product.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Product
