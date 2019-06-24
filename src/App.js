import React from 'react';
import './App.css';
import { getAllHackathons } from "./redux/actions/actions";
import JoinTeam from "./components/team/JoinTeam"
import SideMenu from "./components/navBar/SideMenu"
import NavBar from "./components/navBar/NavBar";
import ChallengesList from "./components/challenges/ChallengesList";
import Train from "./components/challenges/Train";
import WithAuth from "./HOCs/WithAuth"
import WithLoading from "./HOCs/WithLoading"
import AddChallenge from "./components/challenges/addChallenge/AddChallenge"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Slide from "./components/slide/Slide"
import jwt_decode from "jwt-decode"
import { setCurrentUser, authenticated } from "./redux/actions/actions"
import AddHackathon from "./components/hackathons/AddHackathon"
import { connect } from "react-redux"
import Footer from "./components/footer/Footer"
import SignUpSignIn from "./components/sign/Modal"
import HackathonsList from './components/hackathons/HackathonsList';
import axios from "axios"
import WithSuperAdminPermission from "./HOCs/WithSuperAdminPermission"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }
  getAllHackathons = () => {
    let url = "http://localhost:8888/api/hackathons/"
    fetch(url, {

      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      return response.json();
    }).then((res) => {
      console.log(res)
      this.props.getAllHackathons(res.hackathons)
      this.setState({ isLoading: false })
    }).catch(e =>
      console.log("error" + e)
    )
  }

  componentDidMount() {
    console.log("mount")
    this.getAllHackathons()
    if (localStorage.token) {

      axios.defaults.headers.common['Authorization'] = localStorage.token;
      this.props.setCurrentUser(jwt_decode(localStorage.token))
      this.props.authenticated(true)
    }
    else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }


  render() {
    const WrappedChallengesList = WithAuth(WithLoading(ChallengesList))
    const WrappedHackathonList = WithLoading(HackathonsList)
    const WrappedTrain = WithAuth(WithLoading(Train))
    const WrappedAddChallenge = WithAuth(WithSuperAdminPermission(WithLoading(AddChallenge)))
    const WrappedAddHackathon = WithAuth(WithSuperAdminPermission(WithLoading(AddHackathon)))




    return (
      <Router>
        <div className="App">
          <NavBar />
          <JoinTeam />

          {this.props.isAuthenticated === false ? <Slide /> : null}
          <SignUpSignIn />
          <div className="flex">
            <SideMenu show={true} />
            <Route exact path="/" render={(props) => <WrappedHackathonList {...props} isLoading={this.state.isLoading} />} />
            {/*<Header />*/}
            <Route exact path="/challenges/:id" render={(props) => <WrappedChallengesList {...props} isLoading={this.state.isLoading} />} />

            <Route exact path="/train" render={(props) => <WrappedTrain {...props} isLoading={this.state.isLoading} />} />

            <Route exact path="/addChallenge" render={(props) => <WrappedAddChallenge {...props} isLoading={this.state.isLoading} />} />
            <Route exact path="/addHackathon" render={(props) => <WrappedAddHackathon {...props} isLoading={this.state.isLoading} />} />


          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  authenticated: isAuthenticated => dispatch(authenticated(isAuthenticated)),
  getAllHackathons: hackathons => dispatch(getAllHackathons(hackathons)),

})


const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
