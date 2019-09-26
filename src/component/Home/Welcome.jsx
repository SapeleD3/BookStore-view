import React from 'react'
import { Button } from 'react-bootstrap'
import GoogleLogin from 'react-google-login'
import './styles.css'
import axios from 'axios'

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        }
        this.responseGoogle = this.responseGoogle.bind(this);
    }


    async responseGoogle(res) {
        console.log('googleresponse', res)
        const data = await Login(res.accessToken);
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
                                clientId='566235978229-d04nunit2k0lfsvn4ps952fmmfjgum2i.apps.googleusercontent.com'
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

export function Login(data) {
    const error = []
    axios.post('http://localhost:6536/user/auth/google', {
        access_token: data
    })
        .then(resp => {
            if (resp.data.token) {
                localStorage.setItem('JWT_TOKEN', resp.data.token)
            } else {
                error.push(resp.message)
            }
        }
        )
    // console.log(resp)

}
