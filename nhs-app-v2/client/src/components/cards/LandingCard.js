import * as React from 'react';
//React Router Imports
import {Link,} from 'react-router-dom'
//MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
//MUI Icons Imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Root = styled('div')(({ theme }) => ({
    padding: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
  }));
const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

const LandingCard = ({image, title, btnText, mainText, contacts, route}) => {
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return(
    <Root>
    
    <Card raised sx={{width: 400}}>
        
        <CardMedia
        component="img"
        height="194"
        image={image}
        alt="NHS stuff"
      />
      <CardHeader title= {title} />
      <CardContent>
        <Button variant="contained" fullWidth component={Link} to={route} >
            <Typography variant="body1">{btnText}</Typography>
        </Button>
      </CardContent>

      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{mainText}</Typography>
          <Typography paragraph>{contacts}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </Root>
    )
}






export default LandingCard