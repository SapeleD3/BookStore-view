import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import './Home/styles.scss'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logoutUser} from '../Redux/actions/userAction'
import history from "./history";

class Navigation extends React.Component {
  state = {
    isActive: true
  }

  togggleClass = (e) => {
    this.setState({ isActive: !this.state.isActive })
  }


  signout = () => {
    this.props.logoutUser(history)
  }

  render() {
    const {user : {isLoggedIn, userData}} = this.props
    return (
      <div>
        <Navbar bg="dark" variant="dark" sticky='top' expand="lg" >
          <div className="sidebar"><i onClick={this.togggleClass} className="fa fa-bars fa-2x"></i></div>
          <Navbar.Brand href="/" style={{ color: 'red', fontWeight: 'bold', fontSize: 24, letterSpacing: 6 }}>StoryTeller</Navbar.Brand>
          <Nav className="ml-auto">
            {
              isLoggedIn ?
                <div className='d-flex justify-content-center'>
                  <Nav.Link className='nav1 d-none d-lg-block'> Welcome {userData.name}</Nav.Link>
                  <Button variant='outline-danger d-none d-lg-block' onClick={this.signout} style={{width: 150, color:'white'}}><i className='fa fa-sign-out d-none d-lg-block'></i> Logout</Button>
                </div>
                : <Nav.Link className=' d-none d-lg-block'><Link to='/stories'><i className="fa fa-book"></i> Public Storie</Link>s</Nav.Link>
            }
          </Nav>
          {userData.name === undefined && this.signout}
        </Navbar>
        <div className="wrapper">
          <Nav id='sidebar' className={this.state.isActive ? 'active' : ''}>
            {
              isLoggedIn ?
                <div>
                  <div className="public">
                    <Nav.Link className='navlink'><i className='fa fa-book fabook'></i><Link to='/stories'> Public Stories </Link></Nav.Link>
                  </div>
                  <Nav.Link className='navlink'><i className='fa fa-cog fabook'></i> <Link to='dashboard'>DashBoard </Link> </Nav.Link>
                  <Nav.Link className='navlink'><i className='fa fa-user fabook'></i><Link to='/mystories'> My Stories </Link></Nav.Link>
                  <Nav.Link className='navlink' onClick={this.signout}><i className='fa fa-sign-out fabook'></i><Link to='/'> Logout </Link> </Nav.Link>
                </div>
                :
                <div>
                  <div className="public">
                    <Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
                    <Nav.Link className='navlink'><i className='fa fa-book fabook'></i><Link to='/stories'> Public Stories </Link></Nav.Link>
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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navigation)
