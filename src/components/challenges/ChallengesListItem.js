import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from "react-router-dom";
import { ReactComponent as Edit } from "../images/edit.svg"
import RemoveChallenge from "./Confirm"
import axios from "axios"
import { ReactComponent as Remove } from "../images/remove.svg"

class ChallengeListItem extends Component {
  constructor(props) {
    super(props);
    this.state = { collapse: false };
  }
  delete = () => {
    let url = "http://localhost:8888/api/challenges/deleteChallenge/" + this.props.challenge._id + "/" + this.props.hackathonId
    axios.delete(url)
      .then(res => this.props.delete(this.props.challenge._id, this.props.hackathonId))
      .catch(e => console.log(e))

  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
      <div className="item">
        <div className="manage-challenge">
          <p>{this.props.challenge.title}</p>
          <span className="flex" style={{ alignItems: "center" }}>
            {this.props.role === "superAdmin" ?

              <Link to={{
                pathname: "/addChallenge",
                state: {
                  edit: true,
                  challenge: this.props.challenge,
                  hackathon: this.props.hackathonId
                }
              }}
                className="link">
                <Edit width="15" style={{ color: "#2f2f2f" }} />Edit
  
            </Link> : null}

            {this.props.role === "superAdmin" ? <RemoveChallenge delete={this.delete} /> : null}
          </span>
        </div>
        <div className="manage-challenge">
          <p>Difficulty : {this.props.challenge.difficulty}</p>

        </div>


        <Link
          to={{
            pathname: "/train",
            state: {
              challenge: this.props.challenge,
              ok: "ok",
              hackathonId: this.props.hackathonId,
              date: this.props.date
            }
          }}
        >
          <Button color="primary" style={{ marginRight: '1rem' }}>Participate</Button>
        </Link>
        <Button color="primary" onClick={this.toggle}  >Details</Button>
        <Collapse isOpen={this.state.collapse} style={{ marginTop: '1px' }}>
          <Card>
            <CardBody>
              {this.props.challenge.details}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default ChallengeListItem;