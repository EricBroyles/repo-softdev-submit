import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    }
});
//destructering the props
const MediaCard = ({image, title, description}) => {
    const classes = useStyles();

    return(
        <div>
        <Card className ={classes.root}>
            <CardActionArea>
                <CardMedia className={classes.media} image={image} title={title}/>
                <CardContent>
                    <Typography gutterBottom varient="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography varient="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
        </div>
    )
}
export default MediaCard