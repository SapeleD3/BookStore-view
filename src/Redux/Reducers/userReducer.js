import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, SET_USER } from '../types'

const initialState = {
    isLoggedIn : false,
    userData: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                isLoggedIn: true
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                isLoggedIn: true,
                loading: false,
                ...action.payload
            }
        default:
            return state;
    }
}