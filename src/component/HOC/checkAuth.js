import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'


const CheckAuth = ({component: Component, isLoggedIn, ...rest}) => (
    <Route 
        {...rest}
        render = {(props) => isLoggedIn === false ? <Redirect to='/' /> : <Component {...props} />}
    />
)

const mapStateToProps = (state) => ({
    isLoggedIn: state.user.isLoggedIn
})

export default connect(mapStateToProps)(CheckAuth)