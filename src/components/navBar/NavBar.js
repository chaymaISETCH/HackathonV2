import React from 'react';
import "./NavBar.css"
import { ReactComponent as Bars } from "../images/bars.svg"
import SideMenu from "./SideMenu"
import { connect } from 'react-redux';
import { toggleShow, changeActiveTab, authenticated, toggleNestedMenu } from "../../redux/actions/actions"
import { setCurrentUser } from "../../redux/actions/actions"
import DropDown from "./DropDown"
const NavBar = ({ toggle,
  changeActiveTab,
  setCurrentUser,
  isAuthenticated,
  authenticated,
  user,
  toggleNestedMenu }) => {



  const logout = () => {
    console.log("logout nav bar")
    localStorage.removeItem('token');
    setCurrentUser({})
    authenticated(false)
  }

  return isAuthenticated === false ?
    (
      <div className="nav-container">
        <ul>
          <li className="sweep-to-bottom nav-item" onClick={e => { toggle(); changeActiveTab("2") }}>Sign In</li>
          <li className="sweep-to-bottom nav-item" onClick={e => { toggle(); changeActiveTab("1") }}>Sign Up</li>
        </ul>
      </div>
    ) : (

      <div className="nav-container">
        <Bars width="30px" style={{ margin: "12px 0px" }} onClick={toggleNestedMenu} />

        <ul>
          <li>{user.points} XP</li>
          <DropDown userName={user.name} logout={logout} />

        </ul>
      </div>

    )
}


const mapStateToProps = (state) => ({
  isAuthenticated: state.user.isAuthenticated,
  user: state.user.user
})

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleShow()),
  changeActiveTab: tab => dispatch(changeActiveTab(tab)),
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  authenticated: isAuthenticated => dispatch(authenticated(isAuthenticated)),
  toggleNestedMenu: () => dispatch(toggleNestedMenu())

})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
