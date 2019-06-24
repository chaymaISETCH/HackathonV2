import React from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Tabs from "./Tabs"
import {connect} from "react-redux"
import {toggleShow} from "../../redux/actions/actions"
const SignUpSignIn = ({show,toggle,className}) => {

    return (
      <div>
      
        <Modal isOpen={show} toggle={toggle} className={className}>
          
          <ModalBody>
            <Tabs />
          </ModalBody>
        
        </Modal>
      </div>
    );
  }


const mapStateToProps = state=>({
  show : state.user.show,
})
const mapDisptachToProps=dispatch=>({
  toggle : () => dispatch(toggleShow())
})
export default connect(
  mapStateToProps,
  mapDisptachToProps)(SignUpSignIn);
