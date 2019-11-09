import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        position: 'fixed',
        transform: 'translate(-50%,-50%)',
          bottom: '15px',
          left: '85%',
      },
      extendedIcon: {
        marginRight: theme.spacing(2),
      }
  }));

export const Addbutton = () => {
    const classes = useStyles()
return (
    <div>
<Link to='/addstories'><Fab color="primary" aria-label="add" className={classes.fab} >
        <AddIcon />
    </Fab></Link>
    </div>
    
)
}