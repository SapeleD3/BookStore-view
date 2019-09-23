import React from 'react'
import { Button } from 'react-bootstrap'
import './styles.css'


export default () => {
    return (
        <div className='welcome text-center'>
            <h1>Welcome</h1>
            <p>Welcome to StoryBooks 1.0.0</p>
            <p>Post stories from the best and worst of your life and choose for them to be read by the world or completley private as your own personal diary</p>
            <Button variant='outline-danger' size='lg' className='goBtn'> <i className='gic fa fa-google right fa-1x'></i>Google Login</Button>
        </div>
    )
}
