import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import userReducer from './Reducers/userReducer'
import uiReducer from './Reducers/uiReducer'
import storyReducer from './Reducers/storyReducer'

const initialState = {};

const middleware = [thunk]

const reducer = combineReducers({
    user: userReducer,
    story: storyReducer,
    UI: uiReducer
})

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const store = createStore(
    reducer,
    initialState,
    enhancer    
)

export default store;