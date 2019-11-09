import React, { useReducer } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import "./stories.scss";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import {sendStory} from '../../Redux/actions/storyAction'
import history from '../history'

import {useDispatch, useSelector} from 'react-redux'
import { Button } from "react-bootstrap";

const useStyles = makeStyles(theme => ({
  form: {
    textAlign: "center",
    padding: 10,
  },
  pageTitle: {
    fonstWeight: "bold",
    letterSpacing: 2
  },
  button: {
    marginTop: 20,
    postion: "relative",
    zIndex: -1
  },
  customError: {
    marginTop: 5,
    color: "red",
    fontSize: "0.8rem"
  },
  menu: {
    width: 200,
    zIndex: -1
  },
  progress: {
    position: "absolute"
  }
}));

const status = [
  {
    value: "public",
    label: "public"
  },
  {
    value: "private",
    label: "private"
  },
  {
    value: "unpublished",
    label: "unpublished"
  }
];

const Addstories = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  
  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };
  const blocks = draftToHtml(convertToRaw(editorState.getCurrentContent()))
  // const value = blocks.map(block => console.log(block)).join('\n');
  // console.log(value)
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "",
      status: "",
      allowComments: true,
    }
  );
  console.log('data', userInput)
  const story = useSelector(state => state.story)
  console.log('storyState', story)
  const dispatch = useDispatch()
  const addStory = (story) => dispatch(sendStory(story, history))

  const handleChange = (e) => {
    setUserInput({[e.target.name]: e.target.value });
  };
  const handleCheck = (e) => {
    setUserInput({[e.target.name]: e.target.checked})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addStory({
      title : userInput.title,
      status: userInput.status,
      allowComments: userInput.allowComments,
      body: blocks
    })
  };
  const classes = useStyles();
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <Typography variant="h5" className={classes.pageTitle}>
          Add Story
        </Typography>
        <form noValidate onSubmit={handleSubmit} >
          <TextField
            id="outlined-basic"
            className={classes.textField}
            label="Title"
            name="title"
            margin="normal"
            onChange={handleChange}
            value={story.title}
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Status"
            name="status"
            className={classes.textField}
            value={userInput.status}
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
            checked={userInput.allowComments}
            onChange={handleCheck}
            name="allowComments"
            value={userInput.allowComments}
            inputProps={{
              "aria-label": "checkbox"
            }}
          />{" "}
          Allow Comments
          <div className="rdwEditorToolbar">
            <Editor
              name='body'
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              toolbar={{
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: true },
                image: { alt: { present: false, mandatory: false } }
              }}
            />
          </div>
          <Button onClick={handleSubmit} className={classes.button}>Upload Story</Button>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

export default Addstories;
