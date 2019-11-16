import React from "react";
import { Container } from "react-bootstrap";
import Typography from "@material-ui/core/Typography";
import Card from "react-bootstrap/Card";
import { Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import ListGroup from "react-bootstrap/ListGroup";
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar'
import { getAstory } from "../../Redux/actions/storyAction";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from 'react-bootstrap'

export default function Story({ match }) {
  const dispatch = useDispatch();
  const story = id => dispatch(getAstory(id));
  const Story = useSelector(state => state.story);

  React.useEffect(() => {
    story(match.params.id);
  }, []);

  let recentStory =
    Story.story._id === match.params.id ? (
      <div>
        <Row container spacing={3} style={{display: 'flex', flexWrap: 'wrap'}}>
          <Col sm={8}>
            <Typography variant="h4" style={{ margin: 10 }}>
              {Story.story.title}
            </Typography>
            <Paper style={{ padding: 20 }}>
              <h4>{moment(Story.story.date).format("MMMM Do YYYY")}</h4>
              <p>
                {moment(Story.story.date)
                  .startOf("day")
                  .fromNow()}
              </p>
              <div dangerouslySetInnerHTML={{ __html: Story.story.body}}></div>
            </Paper>
          </Col>
          <Col sm={4}>
          <Card
            className="text-center box"
            style={{marginTop: 20, marginBottom: 30}}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
<Typography style={{marginBottom: 10}}>{Story.story.user.google.email}</Typography>
                <Avatar src={Story.story.user.google.image} style={{width: 100, height: 100, margin: 'auto'}}></Avatar>
              </ListGroup.Item>
              <ListGroup.Item>
                <Link>
                <Button style={{ marginTop: 5,  }}>More from {Story.story.user.google.name}</Button>
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          </Col>
        </Row>
      </div>
    ) : (
      <p>Loading.......</p>
    );
  return <Container>{recentStory}</Container>;
}
