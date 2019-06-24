import {
    ADD_HACKATHON,
    DELETE_HACKATHON,
    EDIT_HACKATHON,
    GET_ALL_HACKATHON,
    FILTER_BY_TITLE,
    FILTER_BY_DIFFICULTY,
    ADD_CHALLENGE,
    DELETE_CHALLENGE,
    EDIT_CHALLENGE,
    GET_ALL_CHALLENGE,
    FILTER_HACKATHON_BY_TITLE,

    SET_RESULT
} from "../actions/actions"


const hackathonReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_RESULT: return { ...state, result: action.result }
        case GET_ALL_HACKATHON: {
            console.log(action)
            return { ...state, hackathons: action.hackathons }
        }
        case ADD_HACKATHON: return { ...state, hackathons: state.hackathons.concat(action.hackathon) }
        case DELETE_HACKATHON:
            return { ...state, hackathons: state.hackathons.filter(m => m._id !== action._id) }
        case FILTER_BY_TITLE:
            return { ...state, title: action.title }
        case FILTER_HACKATHON_BY_TITLE :
            return { ...state, hackathonTitle: action.title }
        case FILTER_BY_DIFFICULTY:
            return { ...state, difficulty: action.difficulty }
        case EDIT_HACKATHON:
            {
                console.log(action)
                return {
                    ...state, hackathons: state.hackathons.map(m => {
                        if (m._id === action.hackathon._id) {
                            console.log("here reducer if")

                            return action.hackathon
                        }
                        return m
                    })
                }
            }
        //********************************************************** */
        case ADD_CHALLENGE: {
            console.log(action)
            return {
                ...state, hackathons: state.hackathons.map(m => {
                    if (m._id === action.hackathonId) {
                        console.log("here reducer if")
                        m.challenge = m.challenge.concat(action.challenge)

                        return m
                    }
                    return m
                })
            }
        }
        case DELETE_CHALLENGE:
            {
                console.log(action)
                return {
                    ...state, hackathons: state.hackathons.map(m => {
                        if (m._id === action.hackathonId) {
                            console.log("here reducer if")

                            m.challenge = m.challenge.filter(m => m._id !== action._id)

                            return m
                        }
                        return m
                    })
                }
            }

        case EDIT_CHALLENGE:
            {
                console.log("edit", action)
                return {

                    ...state, hackathons: state.hackathons.map(m => {
                        if (m._id === action.hackathonId) {
                            console.log("here reducer if")

                            m.challenge = m.challenge.map(c => {
                                if (c._id === action.challenge._id) {

                                    console.log("here 2")
                                    return action.challenge
                                }
                                return c
                            })

                        }
                        return m
                    })
                }

            }

        default: return state
    }

}

export default hackathonReducer