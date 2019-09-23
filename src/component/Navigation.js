import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import './Home/styles.css'

class Navigation extends React.Component {
  state = {
    isLoggedIn: false
  }
  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" >
          <div className="sidebar"><i class="fa fa-bars fa-2x"></i></div>
          <Navbar.Brand href="#home" style={{ color: 'red', fontWeight: 'bold', fontSize: 24, letterSpacing: 6 }}>StoryTeller</Navbar.Brand>
          <Nav className="mx-auto">
          </Nav>

          {
            this.state.isLoggedIn ?
              <div>
                <Nav.Link>Welcome Moses</Nav.Link>
                <Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
              </div>
              : <Nav.Link className=' d-none d-lg-block'><i className="fa fa-book"></i> Public Stories</Nav.Link>
          }
        </Navbar>
      </div >
    )
  }
}

export default Navigation
