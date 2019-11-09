import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";
import axios from "axios";

export const loginUser = (data, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post("https://young-stream-06168.herokuapp.com/user/auth/google", {
      access_token: data
    })
    .then(resp => {
      setAuthorizationHeader(resp.data.token);
      dispatch(getUser());
      history.push('/dashboard')
    })
    .catch(err => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response
      });
    });
};

export const getUser = () => (dispatch) => {
    dispatch({type: LOADING_USER})
    axios.get('https://young-stream-06168.herokuapp.com/user/me')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('JWT_TOKEN');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
    history.push('/')
}


const setAuthorizationHeader = (token) => {
    const Token = `Bearer ${token}`
    console.log('token', Token)
    localStorage.setItem("JWT_TOKEN", Token)
    axios.defaults.headers.common['Authorization'] = Token;
}