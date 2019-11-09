import { 
    SET_STORY,
    SET_ERRORS,
    LOAD_STORY,
    LOADING_UI,
    CLEAR_ERRORS
} from '../types'

import axios from 'axios'

export const sendStory = (data, history) => dispatch => {
    dispatch({ type: LOADING_UI});
    console.log('data', data)
    axios.post('http://localhost:1234/stories', data)
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
    axios.get('http://localhost:1234/stories')
    .then(res => {
        console.log('from st', res)
        dispatch({type: CLEAR_ERRORS})
        dispatch({
            type: SET_STORY,
            payload: res.data
        })
    })
    .catch(err => console.log(err))
}
