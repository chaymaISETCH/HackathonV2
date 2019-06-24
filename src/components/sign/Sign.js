import React from 'react';
import axios from 'axios'
import { Form, FormGroup, Label, Button, Input, FormFeedback, FormText, Alert } from 'reactstrap';
import jwt_decode from "jwt-decode"
import { setCurrentUser, authenticated, toggleShow } from "../../redux/actions/actions"
import { connect } from "react-redux"
class Sign extends React.Component {


  constructor(props) {

    super(props)
    this.state = {
      visible: false,
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      school: "",
      validEmail: false,
      validPassword: false,
      validSchool: false,
      validConfirmPassword: false,
      validUserName: false

    }
  }
  handleEmailChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    //Find a non-whitespace character
    const regex = /^[a-zA-Z0-9]+\S+@\S+\.[A-Za-z]+$/
    console.log(e.target.value.match(regex))
    this.setState({
      validEmail: e.target.value.match(regex) ? true : false,
      email: e.target.value
    })

  }
  handlePasswordChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
    const regex = /\S{8,}/
    console.log(e.target.value.match(regex))
    this.setState({
      validPassword: e.target.value.match(regex) ? true : false,
      password: e.target.value
    })

  }
  handleUserNameChange = (e) => {

    this.setState({
      validUserName: e.target.value !== '',
      userName: e.target.value
    })

  }
  handleUserSchool = (e) => {

    this.setState({
      validSchool: e.target.value !== '',
      school: e.target.value
    })

  }
  handleConfirmPasswordChange = (e) => {

    this.setState({
      validConfirmPassword: e.target.value === this.state.password || e.target.value === "",
      confirmPassword: e.target.value
    })

  }
  signUp = (e) => {
    console.log("signup")
    let url = 'http://localhost:8888/api/users/register'
    let user = {
      name: this.state.userName,
      email: this.state.email,
      password: this.state.password,
      school: this.state.school
    }
    axios
      .post(url, user)
      .then(res => {
        console.log(res, res.data.email)
        if (res.data.email === "Email already exists")
          this.setState({
            validEmail: false,
            emailErrorMsg: 'Email already exists'
          })
        else
          this.signIn()



      })
      .catch(err => {
        console.log(err)

      })



  }

  //******************************************** */
  signIn = (e) => {
    console.log("signin")

    let url = "http://localhost:8888/api/users/login"
    axios
      .post(url, {
        email: this.state.email,
        password: this.state.password
      })
      .then((response) => {
        console.log(response)
        this.props.setCurrentUser(jwt_decode(response.data.token))
        this.props.authenticated(true)
        localStorage.setItem('token', response.data.token);
        this.props.toggle()

      })
      .catch(e => {
        console.log("response", e.response.status)
        console.log("error" + e)
        if (e.response.status === 400)
          this.setState({ visible: true })
      }
      )
  }








  onDismiss = () => {
    this.setState({ visible: false });
  }

  render() {
    if (this.props.signUp)
      return (
        <div>

          <Form>
            <FormGroup>
              {/*<Label for="exampleEmail">Input without validation</Label>*/}
              <Input placeholder="User Name" style={{ marginTop: "20px" }}
                value={this.state.userName}
                onChange={this.handleUserNameChange}
                invalid={!this.state.validUserName} valid={this.state.validUserName} />
              <FormFeedback>Invalid User Name</FormFeedback>
            </FormGroup>
            <FormGroup>
              {/*<Label for="exampleEmail">Input without validation</Label>*/}
              <Input placeholder="School" style={{ marginTop: "20px" }}
                value={this.state.school}
                onChange={this.handleUserSchool}
                invalid={!this.state.validSchool} valid={this.state.validSchool} />
              <FormFeedback>Invalid School</FormFeedback>
            </FormGroup>
            <FormGroup>

              <Input valid placeholder="Email" onChange={this.handleEmailChange}
                value={this.state.email}
                invalid={!this.state.validEmail} type="email" valid={this.state.validEmail} />
              <FormFeedback>{this.state.emailErrorMsg || 'Invalid Email'}</FormFeedback>
            </FormGroup>
            <FormGroup>

              <Input type="password" onChange={this.handlePasswordChange}
                value={this.state.password}
                invalid={!this.state.validPassword} valid={this.state.validPassword}
                placeholder="password" />
              <FormFeedback>Invalid Password</FormFeedback>
            </FormGroup>
            <FormGroup>

              <Input type="password" onChange={this.handleConfirmPasswordChange}
                value={this.state.confirmPassword}
                invalid={!this.state.validConfirmPassword} valid={this.state.validConfirmPassword} placeholder="confirm password" />
              <FormFeedback>password is not matching</FormFeedback>
            </FormGroup>
            <hr />
          </Form>

          <div className="btn-container">
            <Button onClick={this.signUp} disabled={!(this.state.validEmail
              && this.state.validPassword && this.state.validConfirmPassword
              && this.state.validUserName)}
              style={{
                backgroundColor: this.state.validEmail &&
                  this.state.validPassword && this.state.validConfirmPassword
                  && this.state.validUserName ? "#feb800" : "gray"
              }} className="sign-btn" color="primary">Submit</Button>
            <Button className="sign-btn" color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </div>
        </div>
      );
    else
      return (
        <div>
          <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
            Incorrect username or password.
        </Alert>
          <Form>
            <FormGroup>
              <Input name="email" value={this.state.email} onChange={this.handleEmailChange}
                invalid={!this.state.validEmail} type="email" valid={this.state.validEmail} placeholder="Email" style={{ marginTop: "20px" }} />
              <FormFeedback >Invalid Email</FormFeedback>
            </FormGroup>
            <FormGroup>

              <Input name="password" value={this.state.password}
                onChange={this.handlePasswordChange} type="password"
                invalid={!this.state.validPassword} valid={this.state.validPassword} placeholder="password" />
              <FormFeedback>Invalid Password</FormFeedback>
            </FormGroup>

          </Form>
          <hr />
          <div className="btn-container">
            <Button onClick={this.signIn} disabled={!(this.state.validEmail && this.state.validPassword)} style={{ backgroundColor: this.state.validEmail && this.state.validPassword ? "#feb800" : "gray" }} className="sign-btn" color="primary">Submit</Button>
            <Button className="sign-btn" color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </div>
        </div>
      );

  }
}

const mapDisptachToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  toggle: () => dispatch(toggleShow()),
  authenticated: isAuthenticated => dispatch(authenticated(isAuthenticated))

})
export default connect(
  null,
  mapDisptachToProps)(Sign);