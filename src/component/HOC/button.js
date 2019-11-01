import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
    fab: {
        margin: theme.spacing(1),
        position: 'absolute',
          bottom: theme.spacing(7),
          right: theme.spacing(2),
      },
      extendedIcon: {
        marginRight: theme.spacing(2),
      }
  }));

export const Addbutton = () => {
    const classes = useStyles()
return (
    <Link to='/addstories'><Fab color="primary" aria-label="add" className={classes.fab} >
        <AddIcon />
    </Fab></Link>
)
}