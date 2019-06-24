import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Input, Button, Alert } from 'reactstrap';
import { addChallenge, editChallenge } from '../../../redux/actions/actions';
import { connect } from 'react-redux';
import Language from '../../editor/Language';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/java';
class AddChallenge extends React.Component {
	constructor(props) {
		super(props);
		let challenge = this.props.location.state.challenge
		this.state = {
			activeTab: '1',
			visible: false,
		
			title: challenge.title||'',
			difficulty: challenge.difficulty||'',
			category: challenge.category||'',
			language: challenge.language||'javascript',
			tests: challenge.tests||'',
			randomTests: challenge.randomTests||'',
			details: challenge.details||'',
			
			startDate : challenge.startDate||this.formatDate(new Date()),
			startTime : challenge.startTime||'',
			endDate : challenge.endDate || '',
			endTime : challenge.endTime || '',
			initialSolution: challenge.initialSolution||'',
			valid :{

			}
		};
	}
	componentDidUpdate(prevProps, prevState) {
		let challenge = this.props.location.state.challenge
		if (challenge !== prevProps.location.state.challenge) {
			this.setState({
			
				title: challenge.title||'',
				difficulty: challenge.difficulty||'',
				category: challenge.category||'',
				language: challenge.language||'javascript',
				
				startDate : challenge.startDate||this.formatDate(new Date()),
				startTime : challenge.startTime||'',
				endDate : challenge.endDate || '',
				endTime : challenge.endTime || '',
				tests: challenge.tests||'',
				randomTests: challenge.randomTests||'',
				details: challenge.details||'',
				initialSolution: challenge.initialSolution||''
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
	handleTestsChange = value => {
		this.setState({
			tests: value,
		});
	};
	onDismiss = () => {
		this.setState({ visible: false });
	};
	save = () => {
		const challenge = {
			title: this.state.title,
			difficulty: this.state.difficulty,
			language: this.state.language,
			tests: this.state.tests,
			randomTests: this.state.randomTests,
			details: this.state.details,
	
			initialSolution: this.state.initialSolution,
		};
		if (
			challenge.title === '' ||
			challenge.difficulty === '' ||
			challenge.category === '' ||
			challenge.tests === '' ||
			challenge.language === '' ||
			challenge.randomTests === '' ||
			challenge.details === '' ||
			challenge.initialSolution === '' 
		
		)
			{this.setState({ visible: true });
			this.setState({valid :{
				title : challenge.title === '',
				difficulty : challenge.difficulty === '',
				language : challenge.language === '',
			
			}})
			
			

		}
		else {
			console.log('Bearer ' + localStorage.token);
			axios.defaults.headers.common['Authorization'] = localStorage.token;

			let url = this.props.location.state.edit?
			'http://localhost:8888/api/challenges/editChallenge/'
			+this.props.location.state.challenge._id+"/"+this.props.location.state.hackathon
			:'http://localhost:8888/api/challenges/addChallenge/'+this.props.location.state.hackathon;
			console.log("url",url)
			this.props.location.state.edit?
			axios
				.put(url, challenge)
				.then(res => {
					console.log(res);
					this.props.editChallenge({...challenge, _id:this.props.location.state.challenge._id},this.props.location.state.hackathon)
					this.props.history.goBack();
				})
				.catch(err => {
					console.log(err);
				}):
			axios
				.post(url, challenge)
				.then(res => {
					console.log(res)
					this.props.addChallenge({...challenge,_id:res.data.id},this.props.location.state.hackathon)
					this.props.history.goBack();
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				})
			
		}
		
	};

	handleRandomTestsChange = value => {
		this.setState({
			randomTests: value,
		});
	};
	handleInstructionsChange = value => {
		this.setState({
			details: value,
		});
	};
	handleInitialSolutionChange = value => {
		this.setState({
			initialSolution: value,
		});
	};
	toggle = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab,
			});
		}
	};

	render() {
		return (
			<div style={{ margin: 'auto', marginTop: '20px', height: '-webkit-fill-available' }}>
				<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
					Please fill in all the required fields
				</Alert>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => {
								this.toggle('1');
							}}
						>
							Description
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => {
								this.toggle('2');
							}}
						>
							Instructions
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '3' })}
							onClick={() => {
								this.toggle('3');
							}}
						>
							Initial Solution
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '4' })}
							onClick={() => {
								this.toggle('4');
							}}
						>
							Tests
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '5' })}
							onClick={() => {
								this.toggle('5');
							}}
						>
							Random Tests
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<Row>
							<Col sm="12">
								<div style={{ flex: 1 }}>
									<div style={{ height: '250px', marginTop: '15px', margin: '25px' }}>
										<Input
											name="title"
											invalid={this.state.valid.title}
											
											onChange={this.handleChange}
											type="text"
											value={this.state.title}
											placeholder="Title"
										/>
										<Input name="difficulty"
										invalid={this.state.valid.difficulty}
										 value={this.state.difficulty} type="select" onChange={this.handleChange}>
											<option>difficulty</option>
											<option value="easy">Easy</option>
											<option value="medium">Medium</option>
											<option value="hard">Hard</option>
										</Input>

										<Input
											type="select"
											name="language"
											invalid={this.state.valid.language}
											value={this.state.language}
											className="choose-language"
											onChange={this.handleChange}
										>
											<option>Choose Language :</option>
											{[
												'javascript',
												'sava',
												'php',
												'c',
												'c++',
												'ruby',
												'python',
												'swift',
												'csharp',
												'go',
											].map(l => (
												<option key={l} value={l.toLowerCase()}>
													{l}
												</option>
											))}
										</Input>
										
									</div>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="2">
						<Row>
							<Col sm="12">
								<div style={{ flex: 1 }}>
									<AceEditor
										placeholder="Instructions"
										mode="text"
										theme="tomorrow"
										name="details"
										value={this.state.details}
										fontSize={16}
										showPrintMargin={true}
										showGutter={true}
										highlightActiveLine={true}
										onChange={this.handleInstructionsChange}
										style={{ margin: '10px 0', width: 'unset', height: '250px' }}
									/>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="3">
						<Row>
							<Col sm="12">
								<div style={{ flex: 1 }}>
									<AceEditor
										placeholder="the intitial solution may just be an empty function
      with some comments to help users."
										mode={this.state.language}
										theme="tomorrow"
										onChange={this.handleInitialSolutionChange}
										name="initialSolution"
										value={this.state.initialSolution}
										fontSize={16}
										showPrintMargin={true}
										showGutter={true}
										highlightActiveLine={true}
										style={{ margin: '10px 0', width: 'unset', height: '250px' }}
									/>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="4">
						<Row>
							<Col sm="12">
								<div style={{ flex: 1 }}>
									<AceEditor
										placeholder="Example : assert.equal(add(9,3), 70,
      'Expected: 70, instead got'+add(9,3));
      
      "
										mode={this.state.language}
										theme="tomorrow"
										onChange={this.handleTestsChange}
										name="tests"
										value={this.state.tests}
										fontSize={16}
										showPrintMargin={true}
										showGutter={true}
										highlightActiveLine={true}
										style={{ margin: '10px 0', width: 'unset', height: '250px' }}
									/>
								</div>
							</Col>
						</Row>
					</TabPane>
					<TabPane tabId="5">
						<Row>
							<Col sm="12">
								<div style={{ flex: 1 }}>
									<AceEditor
										onChange={this.handleRandomTestsChange}
										placeholder="Example :
      const solution =(a,b) => a+b        
      let x = parseInt(Math.random()*1000)        
      let y = parseInt(Math.random()*1000)        
      assert.equal(add(x,y),x+y,'Expected:'+solution(x,y)+'instead got'+add(x,y)));
      "
										value={this.state.randomTests}
										mode={this.state.language}
										theme="tomorrow"
										name="randomTests"
										fontSize={16}
										showPrintMargin={true}
										showGutter={true}
										highlightActiveLine={true}
										style={{
											margin: '10px 0',
											width: 'unset',

											height: '250px',
										}}
									/>
								</div>
							</Col>
						</Row>
					</TabPane>
				</TabContent>
				<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<Button className="btn" onClick={this.save}>
						Save
					</Button>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	addChallenge: (challenge,hackathonId) => dispatch(addChallenge(challenge,hackathonId)),
	editChallenge : (challenge,hackathonId) => dispatch(editChallenge(challenge,hackathonId))
});

export default connect(
	null,
	mapDispatchToProps
)(AddChallenge);
