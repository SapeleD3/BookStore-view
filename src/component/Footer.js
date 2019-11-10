import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Addbutton } from "../component/HOC/button";
import {connect} from 'react-redux'

function Footer({user : {isLoggedIn}}) {
  return (
    <Navbar variant="dark" bg='dark' sticky='bottom'>
      <Container>
        <Navbar.Brand href="/">StoryTeller</Navbar.Brand>
      </Container>
      {isLoggedIn && <Addbutton />}
    </Navbar>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
})
  
export default  connect(mapStateToProps)(Footer)
