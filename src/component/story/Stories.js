import React from "react";
import { connect } from "react-redux";
import { truncate, stripTags } from "../HOC/helper";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import { getStory } from "../../Redux/actions/storyAction";
import EditIcon from "@material-ui/icons/Edit";

class Stories extends React.Component {
  componentDidMount() {
    this.props.getStory();
  }
  render() {
    const {
      story: { story },
      user: { userData }
    } = this.props;

    const serve = story[1] ? (
      story.map(st => (
        <div key={st._id} style={{ margin: "auto" }}>
          {st.user.google.email === userData.email && (
            <Link to={`/stories/edit/${st._id}`}>
              <Fab color="primary" aria-label="edit" className="edit-fab">
                <EditIcon />
              </Fab>
            </Link>
          )}
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
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Link to={`/stories/${st._id}`}>
                  <Button style={{ marginTop: 5 }}>Read more</Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
      ))
    ) : (
      <p>Loading.......</p>
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
        {serve}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story,
  user: state.user
});

const mapActionsToProps = {
  getStory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Stories);
