/*import {
    ADD_CHALLENGE,
    DELETE_CHALLENGE,
    EDIT_CHALLENGE,
    GET_ALL_CHALLENGE,
    FILTER_BY_TITLE,
    FILTER_BY_CATEGORY,
    FILTER_BY_DIFFICULTY,

    SET_RESULT
} from "../actions/actions"


const challengeReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_RESULT: return { ...state, result: action.result }
        case GET_ALL_CHALLENGE: return { ...state, challenges: action.challenges }
        case ADD_CHALLENGE: return { ...state, challenges: state.challenges.concat(action.challenge) }
        case DELETE_CHALLENGE:
            return { ...state, challenges: state.challenges.filter(m => m._id !== action._id) }
        case FILTER_BY_TITLE:
            return { ...state, title: action.title }
        case FILTER_BY_CATEGORY:
            return { ...state, category: action.category }
        case FILTER_BY_DIFFICULTY:
            return { ...state, difficulty: action.difficulty }
        case EDIT_CHALLENGE:
            return {
                ...state, challenges: state.challenges.map(m => {
                    if (m._id === action.challenge._id)
                        return action.challenge
                    return m
                })
            }

        default: return state
    }

}

export default challengeReducer*/