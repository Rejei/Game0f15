import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import appReducer from './app-reducer'
import thunkMiddleware from 'redux-thunk'
import timerReducer from './timer-reducer';

let RootReducer = combineReducers({
    game15: appReducer,
    timer: timerReducer
});

type RootReducerType = typeof RootReducer
export type AppStateType = ReturnType<RootReducerType>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(RootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store

export default store;