import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import "./Train.css";
import { connect } from "react-redux"


class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.result !== this.props.result) {
      this.toggle('2')
    }
  }
  toggle = (tab) => {
    if (this.state.activeTab !== tab) {

      this.setState({
        activeTab: tab
      });
    }
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
              Instructions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Output
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="inst">
                  <p className="title">{this.props.challenge.title}</p>
                  <p>{this.props.challenge.details}</p>

                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <div className="inst">
                  <p className="title">Result : {this.props.result}</p>
                </div>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  result: state.hackathon.result,


})

export default connect(
  mapStateToProps)(Tabs);
