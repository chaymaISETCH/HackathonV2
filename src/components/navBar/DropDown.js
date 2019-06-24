import React from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import "./NavBar.css"
export default class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle = () => {
      console.log("tooooooogggglllle")
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
      <DropdownToggle
          tag="li"
          className="drop nav-link"
          data-toggle="dropdown"
          aria-expanded={this.state.dropdownOpen}
        >
          {this.props.userName}
        </DropdownToggle>
          
        <DropdownMenu>
          <DropdownItem header>Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
          <DropdownItem disabled>Action (disabled)</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Foo Action</DropdownItem>
          <DropdownItem>Bar Action</DropdownItem>
          <DropdownItem onClick={this.props.logout}>Logout</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}