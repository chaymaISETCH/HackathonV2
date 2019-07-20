import { createStore } from "redux"
import challenge from "../reducers/challengeReducer"
import user from "../reducers/userReducer"
import hackathon from "../reducers/hackathonReducer"
import team from "../reducers/teamReducer"
import { combineReducers } from "redux"

export default createStore(combineReducers({
    challenge,
    user,
    hackathon,
    team
}), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())