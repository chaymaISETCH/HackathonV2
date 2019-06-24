import React from 'react';
import Editor from "../editor/Editor";
import "./Train.css"
import { connect } from "react-redux";
import Tabs from "./Tabs";
const Train = ({ location, result, date }) => {

  return (
    <div className="train-box">
      {console.log("end date", location.state.date.endDate, location.state.date.endTime)}
      <Tabs challenge={location.state.challenge} result={result} />
      <Editor challenge={location.state.challenge} hackathonId={location.state.hackathonId} date={location.state.date} />
    </div>
  );
}

const mapStateToProps = (state => ({ result: state.result }))

export default connect(mapStateToProps)(Train)