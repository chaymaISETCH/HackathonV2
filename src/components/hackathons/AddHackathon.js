import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Alert } from 'reactstrap';
import { addHackathon, editHackathon } from '../../redux/actions/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { ReactComponent as Edit } from "../images/edit.svg"

class AddHackathon extends React.Component {
    constructor(props) {
        super(props);
        let hackathon = this.props.hackathon
        this.state = {
            modal: false,
            visible: false,
            id: hackathon._id || 0,
            title: hackathon.title || '',
            description: hackathon.description || '',
            orgName: hackathon.orgName || '',
            prize: hackathon.prize || '',
            where: hackathon.where || '',
            image: hackathon.image || '',

            startDate: hackathon.startDate || this.formatDate(new Date()),
            startTime: hackathon.startTime || '',
            endDate: hackathon.endDate || '',
            endTime: hackathon.endTime || '',

            valid: {

            }
        };
    }





    componentDidUpdate(prevProps, prevState) {
        let hackathon = this.props.hackathon
        if (hackathon !== prevProps.hackathon) {
            this.setState({
                id: hackathon._id || 0,
                title: hackathon.title || '',
                description: hackathon.description || '',
                orgName: hackathon.orgName || '',
                prize: hackathon.prize || '',
                where: hackathon.where || '',
                image: hackathon.image || '',

                startDate: hackathon.startDate || this.formatDate(new Date()),
                startTime: hackathon.startTime || '',
                endDate: hackathon.endDate || '',
                endTime: hackathon.endTime || '',

            })
        }
    }
    formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    handleChange = e => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    onDismiss = () => {
        this.setState({ visible: false });
    };
    save = () => {
        const hackathon = {
            title: this.state.title,
            description: this.state.description,
            orgName: this.state.orgName,
            prize: this.state.prize,
            where: this.state.where,
            image: this.state.image,

            startDate: this.state.startDate,
            startTime: this.state.startTime,
            endDate: this.state.endDate,
            endTime: this.state.endTime,

        };
        if (
            hackathon.title === '' ||
            hackathon.description === '' ||
            hackathon.orgName === '' ||
            hackathon.prize === '' ||
            hackathon.where === '' ||
            hackathon.image === '' ||
            hackathon.startDate === ''
            || hackathon.startTime === ''
            || hackathon.endDate === ''
            || hackathon.endTime === ''
        ) {
            this.setState({ visible: true });
            this.setState({
                valid: {
                    title: hackathon.title === '',
                    description: hackathon.description === '',
                    orgName: hackathon.orgName === '',
                    prize: hackathon.prize === '',
                    where: hackathon.where === '',
                    image: hackathon.image === '',
                    startDate: hackathon.startDate === '',
                    startTime: hackathon.startTime === '',
                    endDate: hackathon.endDate === '',
                    endTime: hackathon.endTime === ''
                }
            })



        }
        else {
            console.log('Bearer ' + localStorage.token);
            axios.defaults.headers.common['Authorization'] = localStorage.token;

            let url = this.props.edit ?
                'http://localhost:8888/api/hackathons/editHackathon/'
                + this.state.id
                : 'http://localhost:8888/api/hackathons/addHackathon';
            this.props.edit ?
                axios
                    .put(url, hackathon)
                    .then(res => {
                        console.log(res);
                        this.props.editHackathon({ ...hackathon, _id: this.props.hackathon._id })
                        this.toggle()
                    })
                    .catch(err => {
                        console.log(err);
                    }) :
                axios
                    .post(url, hackathon)
                    .then(res => {
                        this.props.addHackathon(hackathon)
                        this.toggle()
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })

        }
    };







    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                {!this.props.edit ? <Button className="add-btn" onClick={this.toggle} color="primary" style={{ marginRight: '1rem' }}>{this.props.buttonLabel}</Button>
                    : <span className="edit" onClick={this.toggle} ><Edit width="15" style={{ color: "#2f2f2f" }} />Edit</span>}


                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>{this.props.buttonLabel + " hackathon"}</ModalHeader>
                    <ModalBody>

                        <div style={{ marginTop: '20px' }}>
                            <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                                Please fill in all the required fields
				</Alert>

                            <Input
                                name="title"
                                invalid={this.state.valid.title}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.title}
                                placeholder="Title"
                            />
                            <Input
                                name="description"
                                invalid={this.state.valid.description}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.description}
                                placeholder="Description"
                            />
                            <Input
                                name="orgName"
                                invalid={this.state.valid.orgName}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.orgName}
                                placeholder="Organization Name"
                            />
                            <Input
                                name="prize"
                                invalid={this.state.valid.prize}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.prize}
                                placeholder="Prize"
                            />
                            <Input
                                name="where"
                                invalid={this.state.valid.where}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.where}
                                placeholder="Where"
                            />
                            <Input
                                name="image"
                                invalid={this.state.valid.image}

                                onChange={this.handleChange}
                                type="text"
                                value={this.state.image}
                                placeholder="Image"
                            />
                            <span className="flex" style={{ justifyContent: "space-between" }}>
                                Start Time * <Input style={{ width: "auto" }}
                                    invalid={this.state.valid.startDate}
                                    onChange={this.handleChange}
                                    value={this.state.startDate}
                                    name="startDate"
                                    type="date" />

                                At <Input style={{ width: "auto" }}
                                    invalid={this.state.valid.startTime}
                                    name="startTime"
                                    onChange={this.handleChange}
                                    value={this.state.startTime}
                                    type="time" />
                            </span>
                            <span className="flex" style={{ justifyContent: "space-between", display: this.state.category === "General" ? "none" : "" }}>
                                End Time * <Input style={{ width: "auto" }}
                                    invalid={this.state.valid.endDate}
                                    onChange={this.handleChange}
                                    value={this.state.endDate}
                                    name="endDate"
                                    type="date" />

                                At <Input style={{ width: "auto" }}
                                    onChange={this.handleChange}
                                    name="endTime"
                                    value={this.state.endTime}
                                    invalid={this.state.valid.endTime}
                                    type="time" />
                            </span>

                        </div>





                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn" onClick={this.save}>
                            Save
					</Button>

                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    addHackathon: hackathon => dispatch(addHackathon(hackathon)),
    editHackathon: hackathon => dispatch(editHackathon(hackathon))
});

export default connect(
    null,
    mapDispatchToProps
)(AddHackathon);
