import React from 'react'
import { Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import './styles.scss'
import history from '../history'
import secret from '../../services/secret'

//redux
import {connect} from 'react-redux'
import {loginUser, getUser} from '../../Redux/actions/userAction'


class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: ''
        }
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    async responseGoogle(res) {
        this.props.loginUser(res.accessToken, history)
    }

    render() {
        const {user:  {isLoggedIn, userData} } = this.props
        return (
            <div className='welcome text-center'>
                {
                    isLoggedIn ?
                        <div>
                            <h1 className='greet'>Welcome {userData.email}</h1>
                            <p>Welcome to StoryBooks 1.0.0</p>
                            <p>Post stories from the best and worst of your life and choose for them to be read by the world or completley private as your own personal diary</p>
                        </div>
                        :
                        <div>
                            <h1>Welcome</h1>
                            <p>Welcome to StoryBooks 1.0.0</p>
                            <p>Post stories from the best and worst of your life and choose for them to be read by the world or completley private as your own personal diary</p>
                        </div>
                }

                {
                    isLoggedIn ?
                        <div></div>
                        :
                        <div>
                            <GoogleLogin
                                clientId={secret.clientID}
                                render={
                                    renderProps => (
                                        <Button variant='outline-danger' size='lg' className='goBtn' onClick={renderProps.onClick} disabled={renderProps.disabled}> <i className='gic fa fa-google right fa-1x'></i>Google Login </Button>
                                    )
                                }
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                            {/* <div>
                            <Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login </Button>
                        </div> */}
                        </div>


                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
  });
  
  const mapActionsToProps = {
    loginUser,
    getUser
  }


export default connect(mapStateToProps, mapActionsToProps)(Welcome)
