import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Footer() {
  return (
    <Navbar expand="lg" variant="dark" bg='dark' sticky='bottom' fixed='bottom'>
      <Container>
        <Navbar.Brand href="/">StoryTeller</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
