import React from "react";
import { connect } from "react-redux";
import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";

import { getStory } from "../../Redux/actions/storyAction";

class Stories extends React.Component {
  componentDidMount() {
    this.props.getStory();
  }
  render() {
    const {
      story: { story }
    } = this.props;
    console.log(story);
    const storyComp = story.map(st => (
      <Card
        className="text-center box"
        style={{ width: "18rem", margin: 20, cursor: "pointer" }}
      >
        <ListGroup variant="flush" key={st._id}>
          <ListGroup.Item>
            <h6>{st.title}</h6>
            <p>{st.body}</p>
            <Chip
              variant="outlined"
              label={st.user.google.email}
              avatar={
                <Avatar
                  src={st.user.google.image}
                />
              }
            />
          </ListGroup.Item>
          <ListGroup.Item>
            <Button style={{ marginTop: 5 }}>Read more</Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    ));
    return (
      <Container style={{ display: "flex", flexFlow: "row wrap" }}>
        {storyComp}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  story: state.story
});

const mapActionsToProps = {
  getStory
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Stories);
