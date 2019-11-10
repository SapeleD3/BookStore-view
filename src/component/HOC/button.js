import React from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab: {
    left: '90%',
    bottom: 15,
    margin: 8,
    position: 'fixed',
    transform: 'translate(-50%,-50%)'
  },
  extendedIcon: {
    marginRight: theme.spacing(2)
  }
}));

export const Addbutton = () => {
  const classes = useStyles();
  return (
    <Link to="/addstories">
      <Fab color="primary" aria-label="add" className={classes.fab} >
        <AddIcon />
      </Fab>
    </Link>
  );
};
