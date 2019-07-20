import {
    SET_TEAM, DELETE_FROM_TEAM, EDIT_TEAM_MEMBER, ADD_MEMBER, INVITE
} from "../actions/actions"


const teamReducer = (state = { members: [], invites: [] }, action) => {

    switch (action.type) {
        case SET_TEAM: return { ...state, name: action.team.name, image: action.team.image }

        case DELETE_FROM_TEAM:
            return {}

        case EDIT_TEAM_MEMBER:
            return { ...state, name: action.team.name, image: action.team.image }
        //********************************************************** */
        case ADD_MEMBER: {
            console.log(action)
            return { ...state, members: state.members.concat(action.user) }

        }
        case INVITE: {
            console.log(action)
            return { ...state, invites: state.invites.concat(action.user) }

        }
        default: return state
    }

}

export default teamReducer