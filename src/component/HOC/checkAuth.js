const checkAuth = {
    token: "",
    Authenticate(){
      console.log('1',checkAuth.token)
      const token = localStorage.getItem('JWT_TOKEN')
      checkAuth.token = token;
      console.log('2',checkAuth.token)
    }
}

export default checkAuth;