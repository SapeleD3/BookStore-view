import React from "react";
import { Container } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import { getAstory, addComment } from "../../Redux/actions/storyAction";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import history from "../history";
import Chip from "@material-ui/core/Chip";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

export default function Story({ match }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const story = id => dispatch(getAstory(id));
  const Story = useSelector(state => state.story);
  const User = useSelector(state => state.user);

  const [comment, setComment] = React.useState({ commentBody: "" });

  React.useEffect(() => {
    story(match.params.id);
  }, []);

  const handleChange = e => {
    setComment({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (comment, history) => {
    dispatch(addComment(Story.story._id, comment, history));
  };

  let recentStory =
    Story.story._id === match.params.id ? (
      <div>
        <Row
          container
          spacing={3}
          style={{ display: "flex", flexWrap: "wrap" }}
        >
          <Col sm={8}>
            <Typography variant="h4" style={{ margin: 10 }}>
              {Story.story.title}
              {User.userData.email === Story.story.user.google.email && (
                <Link to={`/stories/edit/${Story.story._id}`}>
                  <span style={{ cursor: "pointer", marginLeft: 5 }}>
                    <EditIcon />
                  </span>
                </Link>
              )}
            </Typography>
            <Paper style={{ padding: 20 }}>
              <h4>{moment(Story.story.date).format("MMMM Do YYYY")}</h4>
              <p>
                {moment(Story.story.date)
                  .startOf("day")
                  .fromNow()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: Story.story.body }}></div>
            </Paper>
            {User.isLoggedIn ? (
              <div>
                {" "}
                {Story.story.allowComments && (
                  <Paper style={{ padding: 20, marginTop: 5 }}>
                    <h4>comments</h4>
                    <TextField
                      id="filled-basic"
                      name="commentBody"
                      className={classes.textField}
                      label="Add comments"
                      margin="normal"
                      onChange={handleChange}
                      variant="filled"
                      fullWidth
                    />
                    <Button
                      style={{ marginTop: 5, marginLeft: 6 }}
                      onClick={() => handleSubmit(comment, history)}
                    >
                      Submit
                    </Button>
                  </Paper>
                )}{" "}
              </div>
            ) : (
              <div>
                {" "}
                {Story.story.allowComments && (
                  <Paper style={{ padding: 20, marginTop: 5 }}>
                    <h4>comments</h4>
                    <Typography>
                      Please{" "}
                      <Link to="/" style={{ color: "blue" }}>
                        Log in
                      </Link>{" "}
                      to leave a comment
                    </Typography>
                  </Paper>
                )}{" "}
              </div>
            )}
            {Story.story.allowComments && (
              <div>
                {Story.story.user.google ? (
                  <div>
                    {Story.story.comments.map(comment => (
                      <Paper style={{ padding: 20, marginTop: 5 }}>
                        <Typography style={{ marginLeft: 6 }}>
                          {comment.commentBody}
                        </Typography>
                        <Chip
                          variant="outlined"
                          label={comment.commentUser.google.email}
                          avatar={
                            <Avatar src={comment.commentUser.google.image} />
                          }
                        />
                        <br />
                        <small style={{ marginLeft: 6 }}>
                          {moment(comment.commentDate).format("MMMM Do YYYY")}
                        </small>
                      </Paper>
                    ))}
                  </div>
                ) : (
                  <p>Loading.......</p>
                )}
              </div>
            )}
          </Col>
          <Col sm={4}>
            <Card
              className="text-center box"
              style={{ marginTop: 20, marginBottom: 30 }}
            >
              {Story.story.user.google ? (
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Typography style={{ marginBottom: 10 }}>
                      {Story.story.user.google.email}
                    </Typography>
                    <Avatar
                      src={Story.story.user.google.image}
                      style={{ width: 100, height: 100, margin: "auto" }}
                    ></Avatar>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to={`/stories/user/${Story.story.user._id}`}>
                      <Button style={{ marginTop: 5 }}>
                        More from {Story.story.user.google.name}
                      </Button>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              ) : (
                <p>Loading.......</p>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <p>Loading.......</p>
    );
  return <Container>{recentStory}</Container>;
}
