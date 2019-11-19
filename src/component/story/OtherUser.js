import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { truncate, stripTags } from "../HOC/helper";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { getUserStory } from "../../Redux/actions/storyAction";
import Typography from "@material-ui/core/Typography";

class MyStory extends React.Component {
  componentDidMount() {
    this.props.getUserStory(this.props.match.params.id);
  }
  render() {
    const {
      story: { story }
    } = this.props;
    const storyComp = story[0] ? (
      story.map(st => (
        <div key={st._id} style={{ margin: "10px 50px 20px"}}>
          <div>
            <Card
              className="text-center box"
              style={{ width: "18rem", marginTop: 10,  }}
            >
              <ListGroup variant="flush" key={st._id}>
                <ListGroup.Item>
                  <h6>{st.title}</h6>
                  <p className="story-text">
                    {truncate(stripTags(st.body), 100)}
                  </p>
                  <Chip
                    variant="outlined"
                    label={st.user.google.email}
                    avatar={<Avatar src={st.user.google.image} />}
                    style={{ marginTop: 5, cursor: "pointer" }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Link to={`/stories/${st._id}`}>
                    <Button style={{ marginTop: 5, cursor: "pointer" }}>
                      Read more
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </div>
        </div>
      ))
    ) : (
      <p>Loading.....</p>
    );
    return (
      <div
      >
        <Row
          container
          spacing={3}
          style={{display: "flex", flexFlow: "row wrap"}}
        >
          <Col sm={4}>
            <div>
              <Card
                className="text-center box"
                style={{
                  width: "17rem",
                  margin: 'auto',
                  marginTop: 10
                }}
              >
                {story[0] ? (
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Typography style={{ marginBottom: 10 }}>
                        {story[0].user.google.email}
                      </Typography>
                      <Avatar
                        src={story[0].user.google.image}
                        style={{ width: 100, height: 100, margin: "auto" }}
                      ></Avatar>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to={`/stories/user/${story[0].user._id}`}>
                        <Button style={{ marginTop: 5 }}>
                          More from {story[0].user.google.name}
                        </Button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                ) : (
                  <p>Loading.......</p>
                )}
              </Card>
            </div>
          </Col>
          <Col sm={8}>
            <div style={{display: 'flex', flexFlow: "row wrap"}}>
              {storyComp}
            </div></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
  user: state.user
});

const mapActionsToProps = {
  getUserStory
};

export default connect(mapStateToProps, mapActionsToProps)(MyStory);
