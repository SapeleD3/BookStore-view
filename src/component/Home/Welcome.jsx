import React from 'react'
import { Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import './styles.css'
import history from '../history'
import secret from '../../services/secret'

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
        this.responseGoogle = this.responseGoogle.bind(this);
    }


    async responseGoogle(res) {
        await secret.Login(res.accessToken);
        if (res.profileObj.email) {
            history.push('/dashboard')
        } else {
            history.push('/')
        }
    }

    render() {
        return (
            <div className='welcome text-center'>
                {
                    this.state.isLoggedIn ?
                        <div>
                            <h1>Welcome Moses</h1>
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
                    this.state.isLoggedIn ?
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


export default Welcome
