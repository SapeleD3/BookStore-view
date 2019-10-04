const checkAuth = {
    isAuth: false,
    Auth() {
        const jwtToken = localStorage.getItem('JWT_TOKEN')
        console.log(this.isAuth);
        if (jwtToken) {
            this.isAuth = true;
        }
    }
}

export default checkAuth;