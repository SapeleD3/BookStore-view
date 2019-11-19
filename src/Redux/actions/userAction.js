import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER
} from "../types";
import axios from "axios";

const url = 'https://young-stream-06168.herokuapp.com'

export const loginUser = (data, history) => dispatch => {
  dispatch({ type: LOADING_UI });
  axios
    .post(`${url}/user/auth/google`, {
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
    axios.get(`${url}/user/me`)
    .then(res => {
      if(res.status === 200){
        dispatch({
          type: SET_USER,
          payload: res.data
      })
      }else {
        dispatch(logoutUser());
      }
    })
    .catch(err => console.log('11',err))
}

export const logoutUser = (history) => (dispatch) => {
    localStorage.removeItem('JWT_TOKEN');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
    history.push('/')
}


const setAuthorizationHeader = (token) => {
    const Token = `Bearer ${token}`
    localStorage.setItem("JWT_TOKEN", Token)
    axios.defaults.headers.common['Authorization'] = Token;
}