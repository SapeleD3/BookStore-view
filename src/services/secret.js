import axios from 'axios'
import checkAuth from '../component/HOC/checkAuth'

const secret = {
    clientID: "566235978229-d04nunit2k0lfsvn4ps952fmmfjgum2i.apps.googleusercontent.com",
    Login(data) {
        const error = []
        axios.post('http://localhost:6536/user/auth/google', {
            access_token: data
        })
            .then(resp => {
                if (resp.data.token) {
                    localStorage.setItem('JWT_TOKEN', resp.data.token)
                    checkAuth.Auth()
                } else {
                    error.push(resp.message)
                }
            }
        )
    }
}

export default secret