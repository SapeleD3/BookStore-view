import { SET_STORY } from '../types'


function storyReducer (state = {story: [], message: ''}, action){
    switch(action.type){
        case SET_STORY:
            return {
                message: action.payload.message,
                story: action.payload
            }
        default:
            return state;
    }
}

export default storyReducer