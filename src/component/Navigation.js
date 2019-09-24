import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import './Home/styles.css'

class Navigation extends React.Component {
  state = {
    isLoggedIn: false,
    isActive: true
  }

  togggleClass = (e) => {
    this.setState({ isActive: !this.state.isActive })
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" >
          <div className="sidebar"><i onClick={this.togggleClass} className="fa fa-bars fa-2x"></i></div>
          <Navbar.Brand href="#home" style={{ color: 'red', fontWeight: 'bold', fontSize: 24, letterSpacing: 6 }}>StoryTeller</Navbar.Brand>
          <Nav className="ml-auto">
            {
              this.state.isLoggedIn ?
                <div className='d-none d-lg-block'>
                  <Nav.Link aria-controls="basic-navbar-nav">Welcome Moses</Nav.Link>
                  <Nav.Link> <i className='btn fa fa-sign-out'></i> Logout</Nav.Link>
                </div>
                : <Nav.Link className=' d-none d-lg-block'><i className="fa fa-book"></i> Public Stories</Nav.Link>
            }
          </Nav>

        </Navbar>
        <div className="wrapper">
          <Nav id='sidebar' className={this.state.isActive ? 'active' : ''}>
            {
              this.state.isLoggedIn ?
                <div>
                  <div className="public">
                    <Nav.Link className='navlink'><i className='fa fa-book fabook'></i> Public Stories</Nav.Link>
                  </div>
                  <Nav.Link className='navlink'><i className='fa fa-cog fabook'></i> DashBoard </Nav.Link>
                  <Nav.Link className='navlink'><i className='fa fa-user fabook'></i> My Stories </Nav.Link>
                  <Nav.Link className='navlink'><i className='fa fa-sign-out fabook'></i> Logout </Nav.Link>
                </div>
                :
                <div>
                  <div className="public">
                    <Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
                    <Nav.Link className='navlink'><i className='fa fa-book fabook'></i> Public Stories</Nav.Link>
                  </div>

                </div>

            }
          </Nav>
        </div>
        {this.props.children}
      </div >
    )
  }
}

export default Navigation
