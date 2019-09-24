import React from 'react'
import { Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import './styles.css'
import http from '../../services/httpService'
import apiUrl from '../../config.json'


class Welcome extends React.Component {
    state = {
        isLoggedIn: false
    }

    log = () => {
        fetch('http://localhost:6536/auth/google')
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
                            <a href="http://localhost:6536/auth/google" target="_blank"><Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button></a>

                            {/* <GoogleLogin
                            clientId='number'
                            render={renderProps => (
                                <Button variant='outline-danger' onClick={renderProps.onClick} disabled={renderProps.disabled} size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
                            )}
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        /> */}
                        </div>
                        

                }
            </div>
        )
    }
}

export default Welcome
