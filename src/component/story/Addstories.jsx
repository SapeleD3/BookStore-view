import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: "center",
    padding: 10
  },
  pageTitle: {
    margin: "20px auto 20px auto",
    fonstWeight: "bold",
    letterSpacing: 2
  },
  button: {
    marginTop: 20,
    postion: "relative"
  },
  customError: {
    marginTop: 5,
    color: "red",
    fontSize: "0.8rem"
  },
  menu: {
    width: 200
  },
  progress: {
    position: "absolute"
  }
}));

const status = [
  {
    value: "Public",
    label: "Public"
  },
  {
    value: "Private",
    label: "Private"
  },
  {
    value: "Unpublished",
    label: "Unpublished"
  }
];

const Addstories = () => {
  const [Status, setCurrency] = React.useState("Private");
  const [state, setState] = React.useState({
    checkedA: true
  });
  // const [state2, setState2] = React.useState({
  //   editorState: EditorState.createEmpty()
  // });

  const onEditorChange = (event, editor) => {
    const data = editor.getData();
    console.log({ onChange: event, editor, data });
  };
  const handleChange = name => event => {
    // setCurrency(event.target.value)
    setState({ ...state, [name]: event.target.checked });
  };
  const handleSubmit = () => {};
  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h4" className={classes.pageTitle}>
          Add Story
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Title"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Status"
            className={classes.textField}
            value={Status}
            onChange={handleChange}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Please select your Story Status"
            margin="normal"
            variant="outlined"
            fullWidth
          >
            {status.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Checkbox
            checked={state.checkedA}
            onChange={handleChange("checkedA")}
            value="checkedA"
            inputProps={{
              "aria-label": "checkbox"
            }}
          />{" "}
          Allow Comments
          <div>
            <CKEditor
              editor={ClassicEditor}
              data="<p>Hello from CKEditor 5!</p>"
              onChange={onEditorChange}
            />
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Addstories;
