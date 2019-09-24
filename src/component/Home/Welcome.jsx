import React from 'react'
import { Button } from 'react-bootstrap'
import './styles.css'
import http from '../../services/httpService'
import apiUrl from '../../config.json'


class Welcome extends React.Component {
    state = {
        isLoggedIn: false
    }

    login = () => {
        // http.get(`${apiUrl}/auth/google`)
        fetch('http://localhost:6536/auth/google')
            .then(res => res.json())
            .then(console.log)
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
                        <Button onClick={this.login} variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
                }
            </div>
        )
    }
}

export default Welcome
