import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const CheckNotAuth = ({component: Component, isLoggedIn, ...rest}) => (
    <Route 
        {...rest}
        render = {(props) => isLoggedIn === true ? <Redirect to='/dashboard' /> : <Component {...props} />}
    />
)

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps)(CheckNotAuth)