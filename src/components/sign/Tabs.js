import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Sign from "./Sign"
import { connect } from "react-redux"
class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: props.activeTab
    };
  }


  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.activeTab !== prevProps.activeTab)
      this.setState({ activeTab: this.props.activeTab })
  }
  render() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Sign Up
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Sign In
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Sign signUp={true} />
          </TabPane>
          <TabPane tabId="2">
            <Sign />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  activeTab: state.user.activeTab
})
export default connect(mapStateToProps)(Tabs)