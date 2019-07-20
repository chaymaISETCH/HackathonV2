import React from 'react';

import "../challenges/ChallengesList.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AddHackathon from "./AddHackathon";
import "./HackathonsList.css"
import { Input, Button } from "reactstrap"
import { getAllHackathons, deleteHackathon, filterHackathonByTitle } from "../../redux/actions/actions";
import Item from "./HackathonListItem";
class HackathonsList extends React.Component {

    formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    render() {
        return (
            <div className="challenge" style={{ flexDirection: "column" }}>
                <span className="flex">
                    <Input type="search" placeholder="search" onChange={e => this.props.filterHackathonByTitle(e.target.value)} />

                    {this.props.user?this.props.user.role==="superAdmin"?<AddHackathon edit={false} hackathon={{}} buttonLabel="ADD" />:null:null}
                </span>
                <div className="challenge">
                    <div className="challenges-list hackathon-list">
                        {this.props.hackathons ? this.props.hackathons
                            .sort((a, b) => a.title.localeCompare(b.title))
                            .filter(c => c.title.toUpperCase().match(this.props.hackathonTitle.toUpperCase()))

                            .map(hackathon => <Item role={this.props.user ? this.props.user.role : ""} delete={this.props.deleteHackathon} key={hackathon._id} hackathon={{ ...hackathon, startDate: this.formatDate(hackathon.startDate), endDate: this.formatDate(hackathon.endDate) }} />) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => ({
    hackathons: state.hackathon.hackathons,
    title: state.hackathon.title || "",
    user: state.user.user,
    hackathonTitle: state.hackathon.hackathonTitle || ""

})
const mapDisptachToProps = dispatch => ({
    deleteHackathon: id => dispatch(deleteHackathon(id)),
    filterHackathonByTitle: title => dispatch(filterHackathonByTitle(title))
})
export default connect(
    mapStateToProps,
    mapDisptachToProps)(HackathonsList);
