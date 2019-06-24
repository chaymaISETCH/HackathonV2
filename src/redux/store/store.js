import { createStore } from "redux"
import challenge from "../reducers/challengeReducer"
import user from "../reducers/userReducer"
import hackathon from "../reducers/hackathonReducer"
import { combineReducers } from "redux"

export default createStore(combineReducers({ challenge, user, hackathon }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())