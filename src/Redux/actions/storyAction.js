import { 
    SET_STORY,
    SET_ERRORS,
    LOAD_STORY,
    LOADING_UI,
    CLEAR_ERRORS
} from '../types'

import axios from 'axios'

const url = 'https://young-stream-06168.herokuapp.com'
// const url = 'http://localhost:1234'

export const sendStory = (data, history) => dispatch => {
    dispatch({ type: LOADING_UI});
    console.log('data', data)
    axios.post(`${url}/stories`, data)
    .then(resp => {
        console.log(resp)
        dispatch(getStory());
        dispatch({type: CLEAR_ERRORS})
        history.push('/stories')
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response         
        })
    })
}

export const getStory = () =>(dispatch) =>  {
    dispatch({type: LOAD_STORY})
    axios.get(`${url}/stories`)
    .then(res => {
        console.log('from st', res)
        dispatch({type: CLEAR_ERRORS})
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
        return res.data
    })
    .catch(err => console.log(err))
}

export const getMyStory = () =>(dispatch) =>  {
    dispatch({type: LOAD_STORY})
    axios.get(`${url}/stories/new`)
    .then(res => {
        dispatch({type: CLEAR_ERRORS})
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}


export const getAstory = (id) =>(dispatch) =>  {
    dispatch({type: LOAD_STORY})
    axios.get(`${url}/stories/${id}`)
    .then(res => {
        dispatch({type: CLEAR_ERRORS})
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}


export const updateStory = (data, history, id) => dispatch => {
    dispatch({ type: LOADING_UI});
    console.log('data', data)
    console.log('id', id)
    axios.put(`${url}/stories/${id}`, data)
    .then(resp => {
        dispatch({type: CLEAR_ERRORS})
        history.push('/dashboard')
    })
    .catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response         
        })
    })
}

export const deleteAstory = (id) =>(dispatch) =>  {
    dispatch({type: LOADING_UI})
    axios.delete(`${url}/stories/${id}`)
    .then(res => {
        console.log('from a', res.data)
        dispatch({type: CLEAR_ERRORS})
        dispatch(getMyStory())
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}

export const addComment = (id, data, history) => (dispatch) => {
    console.log(id, data)
    dispatch({type: LOADING_UI})
    axios.post(`${url}/stories/comment/${id}`, data)
    .then(res => {
        dispatch({type: CLEAR_ERRORS})
        dispatch(getAstory(id))
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
        history.push(`/stories`)
        dispatch(getStory())
    })
    .catch(err => console.log(err))
}

export const getUserStory = (id) =>(dispatch) =>  {
    dispatch({type: LOAD_STORY})
    axios.get(`${url}/stories/user/${id}`)
    .then(res => {
        dispatch({type: CLEAR_ERRORS})
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}
