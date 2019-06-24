import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { Link } from "react-router-dom";
import "./HackathonsList.css"
import AddHackathon from "./AddHackathon";

import { ReactComponent as Award } from "../images/award.svg"
import { ReactComponent as Remove } from "../images/remove.svg"
import { ReactComponent as Edit } from "../images/edit.svg"
import { ReactComponent as Calendar } from "../images/calendar.svg"
import RemoveHackathon from "../confirm/Confirm"
import { ReactComponent as Map } from "../images/map.svg"

import axios from "axios"


class HackathonListItem extends Component {
    constructor(props) {
        super(props);
        this.state = { collapse: false };
    }
    delete = () => {
        let url = "http://localhost:8888/api/hackathons/deleteHackathon/" + this.props.hackathon._id
        axios.delete(url)
            .then(res => {
                console.log(res)
                this.props.delete(this.props.hackathon._id)
            })
            .catch(e => console.log(e))

    }
    isEnded = () => {

        const d = new Date(this.props.hackathon.endDate + " " + this.props.hackathon.endTime)
        console.log(d)
        return d.getTime() < new Date().getTime()
    }
    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        if (this.props.hackathon.title === "#General")

            return (
                <div className="item hackathon-item general" >
                    <Link
                        to={{
                            pathname: "/challenges/" + this.props.hackathon._id,
                            state: { hackathon: this.props.hackathon }
                        }}
                    >

                        <img src={this.props.hackathon.image} alt={this.props.hackathon.title} />



                        <div style={{ padding: "10px" }}>
                            <span className="title">{this.props.hackathon.title}</span>
                            <br />
                            <span>{this.props.hackathon.description}</span>
                            <br />

                        </div>
                    </Link>
                </div>
            );


        return (
            <div className="item hackathon-item" >
                <div>
                    <img src={this.props.hackathon.image} alt={this.props.hackathon.title} />
                    <div className="manage">

                        {this.props.role === "superAdmin" ? <AddHackathon edit={true} hackathon={this.props.hackathon} buttonLabel="EDIT" /> : null}

                        {this.props.role === "superAdmin" ? <RemoveHackathon delete={this.delete} /> : null}
                    </div>
                </div>
                <div style={{ padding: "10px" }}>
                    <span className="title">{this.props.hackathon.title}</span>
                    <span className="hackathon-description">

                        <Map width="20" style={{ color: "gray" }} />
                        <span>{this.props.hackathon.where}</span>


                    </span>

                    <span className="hackathon-description">

                        <Calendar width="20" style={{ color: "gray" }} />
                        <span>{this.isEnded() ? "Ended" : `${this.props.hackathon.endTime}, ${this.props.hackathon.endDate}`}</span>


                    </span>
                    <span className="hackathon-description">

                        <Award width="20" style={{ color: "gold" }} />
                        <span>{this.props.hackathon.prize}</span>


                    </span>



                    <Link
                        to={{
                            pathname: "/challenges/" + this.props.hackathon._id,
                            state: { hackathon: this.props.hackathon }
                        }}
                    >
                        <Button color="primary" disabled={this.isEnded() && this.props.role !== "superAdmin"} style={{ marginRight: '1rem' }}>{this.props.role === "superAdmin" ? "Challenges" : "Participate"}</Button>
                    </Link>
                    <Button color="primary" onClick={this.toggle}  >Details</Button>
                    <Collapse isOpen={this.state.collapse} style={{ marginTop: '1px' }}>
                        <Card style={{ width: "280px" }}>
                            <CardBody>
                                {this.props.hackathon.description}
                            </CardBody>
                        </Card>
                    </Collapse>
                </div>
            </div>
        );
    }
}

export default HackathonListItem;