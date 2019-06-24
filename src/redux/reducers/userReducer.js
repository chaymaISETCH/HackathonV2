import { TOGGLE_SHOW, SET_CURRENT_USER, CHANGE_ACTIVE_TAB, AUTHENTICATED, TOGGLE_NESTED_MENU, INCREMENT_POINTS } from "../actions/actions"


const userReducer = (state = { show: false, activeTab: "2", isAuthenticated: false, nestedMenu: false }, action) => {

    switch (action.type) {
        case TOGGLE_SHOW: return { ...state, show: !state.show }
        case CHANGE_ACTIVE_TAB: return { ...state, activeTab: action.tab }
        case TOGGLE_NESTED_MENU: return { ...state, nestedMenu: !state.nestedMenu }

        case AUTHENTICATED: {
            console.log("auth")
            return {
                ...state, isAuthenticated: action.isAuthenticated
            }
        }
        case SET_CURRENT_USER: {
            console.log(action)
            return {
                ...state, user: action.user
            }
        }
        case INCREMENT_POINTS: {
            console.log(action)
            return { ...state, user: { ...state.user, points: state.user.points + action.point } }
        }
        default: return state
    }

}

export default userReducer