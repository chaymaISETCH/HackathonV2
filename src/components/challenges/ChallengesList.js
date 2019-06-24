import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as Edit } from "../images/edit.svg"
import FilterBox from "./FilterBox";
import "./ChallengesList.css";
import { Button } from "reactstrap";
import { connect } from "react-redux";
import { getAllChallenges, deleteChallenge } from "../../redux/actions/actions";
import Item from "./ChallengesListItem";
class ChallengesList extends React.Component {



  render() {
    return (
      <div style={{ width: "70%", margin: "auto", marginBottom: "20px" }}>

        <img src={this.props.location.state.hackathon.image} alt={this.props.location.state.hackathon.title} className="hackathon-image" />
        <span className="hackathon-title"><span>{this.props.location.state.hackathon.title} </span>
          {this.props.user.role === "superAdmin" ? <Link to={{
            pathname: "/addChallenge",
            state: {
              edit: false,
              challenge: {},
              hackathon: this.props.location.state.hackathon._id
            }
          }}
            className="link">
            <Button className="add-btn" onClick={this.toggle} color="primary" style={{ marginRight: '1rem' }}>Add challenge</Button>
          </Link> : null}
        </span>
        <div className="challenge">

          <FilterBox />
          <div className="challenges-list">
            {this.props.hackathon ? this.props.hackathon.filter(m => m._id === this.props.match.params.id)[0].challenge

              .filter(c => c.title.toUpperCase().match(this.props.title.toUpperCase()) && c.difficulty.toUpperCase().match(this.props.difficulty.toUpperCase()))
              .map(challenge => <Item date={{ endDate: this.props.hackathon.endDate, endTime: this.props.hackathon.endTime }} hackathonId={this.props.location.state.hackathon._id} delete={this.props.deleteChallenge} key={challenge._id} challenge={challenge} role={this.props.user.role} />) : <span>Empty</span>
            }
          </div>
        </div>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  //challenges: state.challenge.challenges,
  title: state.hackathon.title || "",
  //category: state.challenge.category || "",
  difficulty: state.hackathon.difficulty || "",
  user: state.user.user,
  hackathon: state.hackathon.hackathons
})
const mapDisptachToProps = dispatch => ({
  getAllChallenges: challenges => dispatch(getAllChallenges(challenges)),
  deleteChallenge: (id, hackathonId) => dispatch(deleteChallenge(id, hackathonId))

})
export default connect(
  mapStateToProps,
  mapDisptachToProps)(ChallengesList);
