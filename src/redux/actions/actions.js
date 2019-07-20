//***********************challenge *************/
export const ADD_CHALLENGE = "ADD_CHALLENGE"
export const DELETE_CHALLENGE = "DELETE_CHALLENGE"
export const EDIT_CHALLENGE = "EDIT_CHALLENGE"
export const GET_ALL_CHALLENGE = "GET_ALL_CHALLENGE"
export const FILTER_BY_TITLE = "FILTER_BY_TITLE"
export const SET_RESULT = "SET_RESULT"
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY"
export const FILTER_BY_DIFFICULTY = "FILTER_BY_DIFFICULTY"
/*********************************Team***************** */
export const SET_TEAM = "SET_TEAM"
export const DELETE_FROM_TEAM = "DELETE_FROM_TEAM"
export const EDIT_TEAM_MEMBER = "EDIT_TEAM_MEMBER"
export const ADD_MEMBER = "ADD_MEMBER"
export const INVITE = "INVITE"

export const setTeam = (team) => {
    console.log(team)
    return { type: SET_TEAM, team }
}
export const deleteFromTeam = (id) => {
    return { type: DELETE_FROM_TEAM, id }
}
export const editTeamMember = (user) => {
    return { type: EDIT_TEAM_MEMBER, user }
}
export const addMember = (user) => {
    return { type: ADD_MEMBER, user }
}
export const invite = (user) => {
    return { type: INVITE, user }
}
//*************************Hackathon************************** */
export const ADD_HACKATHON = "ADD_HACKATHON"
export const DELETE_HACKATHON = "DELETE_HACKATHON"
export const EDIT_HACKATHON = "EDIT_HACKATHON"
export const GET_ALL_HACKATHON = "GET_ALL_HACKATHON"
export const FILTER_HACKATHON_BY_TITLE = "FILTER_HACKATHON_BY_TITLE"



export const filterHackathonByTitle = title => ({ type: FILTER_HACKATHON_BY_TITLE, title })


export const addHackathon = (hackathon) => {
    return { type: ADD_HACKATHON, hackathon }
}
export const getAllHackathons = (hackathons) => {
    return { type: GET_ALL_HACKATHON, hackathons }
}
export const deleteHackathon = (_id) => {
    return { type: DELETE_HACKATHON, _id }
}
export const editHackathon = (hackathon) => {
    return { type: EDIT_HACKATHON, hackathon }
}
//**************************************** */
export const filterByTitle = title => ({ type: FILTER_BY_TITLE, title })

export const filterByCategory = category => ({ type: FILTER_BY_CATEGORY, category })

export const filterByDifficulty = difficulty => ({ type: FILTER_BY_DIFFICULTY, difficulty })

export const setResult = result => ({ type: SET_RESULT, result })


export const addChallenge = (challenge, hackathonId) => {
    return { type: ADD_CHALLENGE, challenge, hackathonId }
}
export const getAllChallenges = (challenges, hackathonId) => {
    return { type: GET_ALL_CHALLENGE, challenges, hackathonId }
}
export const deleteChallenge = (_id, hackathonId) => {
    return { type: DELETE_CHALLENGE, _id, hackathonId }
}
export const editChallenge = (challenge, hackathonId) => {
    return { type: EDIT_CHALLENGE, challenge, hackathonId }
}

//************************User ***********/
export const TOGGLE_SHOW = "TOGGLE_SHOW"
export const AUTHENTICATED = "AUTHENTICATED"
export const SET_CURRENT_USER = "SET_CURRENT_USER"
export const CHANGE_ACTIVE_TAB = "CHANGE_ACTIVE_TAB"
export const TOGGLE_NESTED_MENU = "TOGGLE_NESTED_MENU"
export const INCREMENT_POINTS = "INCREMENT_POINTS"
//show or hide modal sign up sign in
export const toggleShow = () => {
    return { type: TOGGLE_SHOW }
}
export const toggleNestedMenu = () => {
    return { type: TOGGLE_NESTED_MENU }
}

export const incrementPoints = (point) => {
    return { type: INCREMENT_POINTS, point }
}
export const authenticated = (isAuthenticated) => {
    return { type: AUTHENTICATED, isAuthenticated }
}
export const setCurrentUser = (user) => {
    return { type: SET_CURRENT_USER, user }
}
export const changeActiveTab = (tab) => {
    return { type: CHANGE_ACTIVE_TAB, tab }
}