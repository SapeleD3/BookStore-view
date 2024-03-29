import React from "react";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import "./stories.scss";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import { getAstory, updateStory } from "../../Redux/actions/storyAction";
import htmlToDraft from "html-to-draftjs";
import { stripTags } from "../HOC/helper";
import history from "../history";

import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const styles = {
  form: {
    textAlign: "center",
    padding: 10
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
};

class Editstories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      title: "",
      status: "",
      allowComments: true
    };
  }

  componentDidMount() {
    fetch(
      `https://young-stream-06168.herokuapp.com/stories/${this.props.match.params.id}`
    )
      .then(res => res.json())
      .then(story => {
        this.setState({
          title: story.title,
          status: story.status,
          allowComments: story.allowComments
        });
        const html = story.body;
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          const editorState = EditorState.createWithContent(contentState);
          this.setState({
            editorState
          });
        }
      });
  }

  onEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheck = e => {
    this.setState({ [e.target.name]: e.target.checked });
  };

  handleSubmit = e => {
    const blocks = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    e.preventDefault();
    const addStory = {
      title: this.state.title,
      status: this.state.status,
      allowComments: this.state.allowComments,
      body: blocks
    };
    this.props.updateStory(addStory, history, this.props.match.params.id);
  };
  render() {
    const statuses = [
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
    const {
      classes,
      story: { story }
    } = this.props;
    const { title, status, allowComments, editorState, body } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h5" className={classes.pageTitle}>
            Add Story
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="outlined-basic"
              className={classes.textField}
              name="title"
              margin="normal"
              onChange={this.handleChange}
              value={title}
              variant="outlined"
              fullWidth
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Status"
              name="status"
              className={classes.textField}
              value={status}
              onChange={this.handleChange}
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
              {statuses.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Checkbox
              checked={allowComments}
              onChange={this.handleCheck}
              name="allowComments"
              value={allowComments}
              inputProps={{
                "aria-label": "checkbox"
              }}
            />{" "}
            Allow Comments
            <div className="rdwEditorToolbar">
              <Editor
                value={body}
                editorState={editorState}
                onEditorStateChange={this.onEditorStateChange}
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
            <Button onClick={this.handleSubmit} className={classes.button}>
              Upload Story
            </Button>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story
});

const mapActionsToProps = {
  updateStory,
  getAstory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Editstories));
