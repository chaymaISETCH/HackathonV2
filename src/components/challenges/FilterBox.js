import React from 'react';
import "./FilterBox.css";
import { connect } from "react-redux";
import { filterByTitle, filterByCategory, filterByDifficulty } from "../../redux/actions/actions"
import { Input } from 'reactstrap';

const FilterBox = ({ filterByTitle, filterByCategory, filterByDifficulty }) => {


  return (
    <div className="filter-box">
      <span> Search</span>
      <hr />
      <div className="filter-options">
        <Input type="text" placeholder="search" onChange={e => { filterByTitle(e.target.value) }} />
        <Input type="select" onChange={e => filterByDifficulty(e.target.value)}>
          <option value="">Difficulty</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </Input>
     
      </div>

    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  filterByTitle: title => dispatch(filterByTitle(title)),
  filterByDifficulty: difficulty => dispatch(filterByDifficulty(difficulty))
})
export default connect(null, mapDispatchToProps)(FilterBox)
