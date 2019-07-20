import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Spinner, Form, FormGroup, FormFeedback } from 'reactstrap';
import "./JoinTeam.css"
import { connect } from "react-redux";
import { addMember, setTeam, invite } from "../../redux/actions/actions"

import axios from "axios"
import { ReactComponent as Back } from "./back.svg"
class JoinTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            modal: false,
            create: false,
            invite: false,
            invalid: false,
            loading: true,
            name: "hhh",
            image: "ggg",
            creating: false,
            invited: [],
            users: [{
                name: "hhh"
            }]
        };

    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    handleChange = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    getUsersBySchool = () => {
        this.setState({ loading: true })
        let url = "http://localhost:8888/api/users/usersBySchool"

        axios.defaults.headers.common['Authorization'] = localStorage.token;
        axios
            .get(url)
            .then(res => {
                console.log("res", res)
                this.setState({ users: res.data.users })
                this.setState({ loading: false })

            })
            .catch(err => {
                console.log(err);
            })

    }
    createTeam = (e) => {
        this.setState({ creating: true })
        let url = "http://localhost:8888/api/teams/createTeam"
        axios
            .post(url, { name: this.state.name, image: this.state.image })
            .then(res => {
                console.log(res)
                if (res.data.error)
                    this.setState({ invalid: true, creating: false })
                else {

                    this.props.setTeam({
                        name: this.state.name,
                        image: this.state.image,
                        _id: res.data.team._id
                    })
                    this.setState({
                        creating: false,
                        invalid: false,
                        id: res.data.team._id,
                        invite: true,
                        create: false
                    })
                }
                //this.props.addChallenge({ res.data }, this.props.location.state.hackathon)
                //this.props.history.goBack();
                //console.log(res);
            })
            .catch(err => {
                this.setState({ creating: false, invalid: true })

                console.log(err);

            })
    }
    invite = (id) => {
        console.log(this.state.invited)

        let url = "http://localhost:8888/api/teams/invite/" + this.state.id
        axios
            .put(url, { _id: id })
            .then(res => {
                console.log(res.data)
                this.setState({ invited: this.state.invited.concat(id) })
                let newUsers = this.state.users.map(item => {
                    if (item._id === id)
                        return { ...item, invited: true }
                    return item
                })
                this.setState({ users: newUsers })
                let url2 = "http://localhost:8888/api/users/invite/" + id
                axios
                    .put(url2, { _id: this.state.id })
                    .then(res => {
                        console.log("res : ", res);
                        //this.props.addMember({ _id: this.state.id })
                        this.props.invite({ _id: this.state.id })
                    })
                    .catch(e => console.log(e))


            })
            .catch(err => {
                console.log(err);
            })
        console.log(this.state.invited)

    }
    isInvited = (id) => {
        console.log(this.state.invited)

        return this.state.invited.includes(id)
    }
    componentDidMount() {
        this.getUsersBySchool()
    }
    render() {
        const closeBtn = <button className="close" onClick={this.toggle}>&times;</button>;
        return (
            <div>
                <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader close={closeBtn} className="title" toggle={this.toggle}>
                        <Back className="back" onClick={() => this.setState({ create: false })} />
                        <span>Participate</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="des">To Participate you need a team of 5 members</div>
                        <div className="team-container" style={{ display: !this.state.create && !this.state.invite ? "flex" : "none" }}>
                            <div >
                                <button className="join-team-btn">Join Team</button>
                            </div>
                            <div >
                                <button className="create-team-btn" onClick={() => this.setState({ create: true })}>{this.state.creating ? "...Creating" : "Create Team"}</button>
                            </div>
                        </div>
                        <div className="create-team" style={{ display: this.state.create && !this.state.invite ? "block" : "none" }}>
                            <Form>
                                <FormGroup>

                                    <Input placeholder="Title" invalid={this.state.invalid} name="name" value={this.state.name} onChange={this.handleChange} style={{ marginTop: "20px" }} />
                                    <FormFeedback>that name is already taken</FormFeedback>
                                </FormGroup>

                                <Input placeholder="Image" name="image" value={this.state.image} onChange={this.handleChange} style={{ marginTop: "20px" }} />
                            </Form>
                            <button className="create-team-btn create-btn" disabled={this.state.creating} onClick={this.createTeam}>{this.state.creating ? "...Creating" : "Create Team"}</button>

                        </div>
                        <div className="invite-container" style={{ display: this.state.invite ? "block" : "none" }}>
                            {this.state.loading ? <div className="loading"><Spinner color="#feb800" /></div> :
                                this.state.users ? this.state.users.map(el =>
                                    <div className="invite">
                                        <div className="image-container">
                                            <img src="https://iupac.org/wp-content/uploads/2018/05/default-avatar.png"
                                                alt="avatar" className="round-image" />
                                        </div>
                                        <div>
                                            <p>{el.name} / {el.school}</p>
                                            <p>{el.email}</p>
                                        </div>
                                        <button className="invite-btn" disabled={el.invited} onClick={() => this.invite(el._id)}>{el.invited ? "waiting" : "Invite"}</button>

                                    </div>) : null


                            }
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    team: state.team


})
const mapDisptachToProps = dispatch => ({
    setTeam: team => dispatch(setTeam(team)),
    addMember: user => dispatch(addMember(user)),
    invite: user => dispatch(invite(user)),
})
export default connect(
    mapStateToProps,
    mapDisptachToProps)(JoinTeam);
