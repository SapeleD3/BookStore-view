import React from "react";
import { connect } from "react-redux";
import Card from "react-bootstrap/Card";
import { truncate, stripTags } from "../HOC/helper";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import { getMyStory } from "../../Redux/actions/storyAction";

class MyStory extends React.Component {
  componentDidMount() {
    this.props.getMyStory();
  }
  render() {
    const {
      story: { story },
      user: { userData }
    } = this.props;
    const storyComp = story[0] ? (
      story.map(st => (
        <div key={st._id} style={{ margin: "auto" }}>
          {st.user.google.email === userData.email && (
            <div>
              <Link to={`/stories/edit/${st._id}`}>
                <Fab color="primary" aria-label="edit" className="edit-fab">
                  <EditIcon />
                </Fab>
              </Link>
              <Card
                className="text-center box"
                style={{ width: "18rem", margin: 20 }}
              >
                <ListGroup variant="flush" key={st._id}>
                  <ListGroup.Item>
                    <h6>{st.title}</h6>
                    <p className='story-text'>{truncate(stripTags(st.body), 100)}</p>
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
          )}
        </div>
      ))
    ) : (
      <p>Loading .....</p>
    );
    return (
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          marginRight: "auto",
          marginLeft: "auto"
        }}
      >
        {storyComp}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
  user: state.user
});

const mapActionsToProps = {
  getMyStory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(MyStory);
