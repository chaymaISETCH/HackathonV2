//Are you sure yes, delete it cancel
import React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { ReactComponent as Remove } from "../images/remove.svg"

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };


    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>

                <span className="link" onClick={this.toggle} >
                    <Remove width="15" style={{ color: "#2f2f2f" }} />Remove
      
            </span>
                <Modal style={{
                    top: "100px",
                    width: "fit-content",
                    margin: "auto"
                }}
                    isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>

                    <ModalBody>
                        Are you sure
          </ModalBody>
                    <ModalFooter>
                        <Button color="primary" style={{ fontSize: "10px" }} onClick={this.props.delete}>Yes, delete it</Button>{' '}
                        <Button color="secondary" style={{ fontSize: "10px" }} onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Confirm;