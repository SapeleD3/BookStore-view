import axios from 'axios'
import history from '../component/history'
import checkAuth from '../component/HOC/checkAuth'

const secret = {
    clientID: "566235978229-d04nunit2k0lfsvn4ps952fmmfjgum2i.apps.googleusercontent.com",
    Login(data) {
        console.log('from secret', data)
        const error = []
        axios.post('http://localhost:1234/user/auth/google', {
            access_token: data
        })
            .then(resp => {
                console.log(resp)
                if (resp.data.token) {
                    localStorage.setItem('JWT_TOKEN', resp.data.token)
                    window.location.href='/dashboard';
                    checkAuth.Authenticate();
                } else {
                    error.push(resp.message)
                }
            }
        )
    }
}

export default secret