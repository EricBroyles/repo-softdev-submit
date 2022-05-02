import * as React from 'react';
import ListForApplicaiton from './ListForApplication';
//MUI Imports
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';


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

export default function ControlApplicationsCards(){
    
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded)
    };

    return(
    <Root>
    
    <Card raised sx={{width: 500, margin:1}}>
        <CardHeader 
            title= "Applications"
            subheader="Edit Applications"
        />
        

      <CardContent>
        <Typography variant="body1" color="text.secondary">
          New Member Application
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Publish On: Date (no edits)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Available Until: Date (no edits)
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
            Application Form Contents (example)
            <ListForApplicaiton  
                items={[{ type: "Number", text: "GPA", wordCount: 0}, {type: "TextField", text: "Here is a question", wordCount: 250}]}
                publishDate={"02/02/2222"}
                untilDate={"02/05/2222"}
            />
          
        
        </CardContent>
      </Collapse>


      <CardContent>
        <Typography variant="body1" color="text.secondary">
          Officer Application
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Publish On: Date (no edits)
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Available Until: Date (no edits)
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
        Application Form Contents (example)
            <ListForApplicaiton  
                items={[{type: "TextField", text: "Here is a question", wordCount: 250},{type: "TextField", text: "Here is a question", wordCount: 250}]}
                publishDate={"02/02/2222"}
                untilDate={"02/05/2222"}
            />
        </CardContent>
      </Collapse>
    </Card>
    </Root>
    )
}