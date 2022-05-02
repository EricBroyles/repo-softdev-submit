import * as React from 'react';
//MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//MUI Icons Imports
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


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

export default function FastFactsCard(){
    
    const [openMenu, setOpenMenu] = React.useState(false);
    
    const handleMenuOpen = (e) => {
        setOpenMenu(e.currentTarget)
    };
    const handleMenuClose = (e) => {
        setOpenMenu(false)
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    return(
    <Root>
    
    <Card raised sx={{width: 500, margin:1}}>
        <CardHeader 
            title= "Statistics"
            action={
                <div>
                    <IconButton 
                        aria-label="more-options"
                        id="basic-button"
                        onClick={handleMenuOpen}
                    >
                        <MoreVertIcon />
                    </IconButton>
                </div>
            }
        />
        <Menu id="basic-menu" open={openMenu} onClose={handleMenuClose} anchorEl={openMenu}>
            <MenuItem onClick={handleMenuClose}>By Week</MenuItem>
            <MenuItem onClick={handleMenuClose}>By Semesterly</MenuItem>
            <MenuItem onClick={handleMenuClose}>All Time</MenuItem>
        </Menu>

      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Tutoring Hours (Type): 
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Service Hours (Type):
        </Typography>
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
          
        </CardContent>
      </Collapse>
    </Card>
    </Root>
    )
}






