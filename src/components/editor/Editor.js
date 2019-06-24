import React from 'react';
import brace from 'brace';
import Timer from "../timer/Timer"
import { connect } from "react-redux";
import Tests from "./Tests"
import Language from "./Language";
import axios from "axios";
import { Route, Redirect } from 'react-router'

import AceEditor from 'react-ace';
import { Button, Input } from 'reactstrap';
import 'brace/ext/language_tools';
import 'brace/mode/java';

import { setResult, incrementPoints } from "../../redux/actions/actions";

class Editor extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: this.props.challenge.initialSolution,
      theme: "monokai",
      result: "",
      status: 0,
      running: false,
      submitting: false
    }
  }

  handleChangeCode = (newValue) => {
    console.log('change', newValue);
    this.setState({ code: newValue })
  }
  isEnded = () => {

    const d = new Date(this.props.date.endDate + " " + this.props.date.endTime)
    console.log(d)
    return d.getTime() < new Date().getTime()
  }


  run = (e) => {
    console.log(e.target.name)
    let submit = e.target.name === "submit" ? true : false
    this.setState({ running: true })
    console.log(this.state.code + "\n" + this.props.challenge.tests)
    let url = "https://api.judge0.com//submissions"
    axios
      .post(url, {
        "source_code": this.state.code + "\n" + this.props.challenge.tests,
        "language_id": "29",

      })
      .then(res => {

        this.getResult(res, submit)
      })
      .catch(err => {
        console.log(err);
      })


  }
  getResult = (res, submit) => {
    console.log(submit)
    let url2 = "https://api.judge0.com//submissions/" + res.data.token;

    axios
      .get(url2)
      .then(result => {
        console.log("status", result.data.status.id);
        /*{1:"In Queue", 2:"Processing",3:"Accepted"}*/

        if (result.data.status.id < 3)
          this.getResult(res, submit)
        else if(result.data.status.id === 3){
         
          this.setState({ status: 3})
          this.props.setResult("Tests passed")
          this.setState({ running: false })
          if (submit)
            this.submitCode()
        }
        else {

          let str = result.data.stderr;
          this.setState({ status: result.data.status.id })
          let r = str.substring(str.indexOf("[ERR_ASSERTION]:") + "[ERR_ASSERTION]:".length, str.indexOf("at"))
          this.props.setResult(result.data.status.id === 3 ? "Tests passed" : r)
          this.setState({ running: false })
          if (submit)
            this.submitCode()



        }

      }

      )
      .catch(err => {
        console.log(err);
      })



    console.log(res);
  }

  submitCode = () => {
    console.log("submitting")
    this.setState({ submitting: true })
    console.log("submit code")
    let url = "http://localhost:8888/api/users/submit"
    axios
      .post(url, {
        "code": this.state.code,
        "status": this.state.status,
        "time": Number(localStorage[this.props.challenge._id]),
        "challengeId": this.props.challenge._id,
        "hackathonId": this.props.hackathonId || ""


      })
      .then(res => {
        console.log(res);
        this.setState({ submitting: false })

        if(this.state.status ===3)
          this.props.incrementPoints(50)
      })
      .catch(e => console.error(e))



  }
  theme = ["monokai", "github", "tomorrow", "kuroir", "twilight", "xcode", "textmate", "solarized_dark", "solarized_light", "terminal"]

  render() {
    if (this.isEnded()) return <Redirect to="/" />
    return (
      <div style={{ flex: 2 }}>
        <Timer challengeId={this.props.challenge._id} />
        <Language languagesList={["JavaScript", "Java", "PHP", "C", "C++", "Ruby", "Python", "Swift", "C#", "GO"]} />
        <Input type="select" className="choose-language" onChange={e => this.setState({ theme: e.target.value })}>
          <option value="monokai">Choose Theme :</option>
          {this.theme.map(l => <option key={l} value={l}>{l}</option>)}
        </Input>
        <AceEditor
          placeholder="GO !!"
          mode="javascript"
          theme={this.state.theme}
          name="blah2"
          onChange={this.handleChangeCode}
          fontSize={16}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          value={this.state.code}
          style={{ flex: 3, width: "unset", height: "300px" }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,

          }} />
        <Tests theme={this.state.theme}
          tests={this.props.challenge.tests} />
        <Button name="run" disabled={this.state.running} onClick={this.run} className="btn">{this.state.running ? "...Running" : "Run Code"}</Button>
        <Button name="submit" onClick={this.run} disabled={this.state.submitting} className="btn">{this.state.submitting ? "...Submitting" : "Submit Code"}</Button>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setResult: result => dispatch(setResult(result)),
  incrementPoints: point => dispatch(incrementPoints(point)),

})
export default connect(null, mapDispatchToProps)(Editor);
