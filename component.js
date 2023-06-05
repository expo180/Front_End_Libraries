class MyComponent extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		activeUsers: null
	  };
	}
	componentDidMount() {
	  setTimeout(() => {
		this.setState({
		  activeUsers: 1273
		});
	  }, 2500);
	}
	render() {
	  return (
		<div>
		  {/* Change code below this line */}
		  <h1>Active Users: {this.state.activeUsers} </h1>
		  {/* Change code above this line */}
		</div>
	  );
	}
  }

  const inputStyle = {
	width: 235,
	margin: 5
  }
  
  class CheckUserAge extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		userAge: '',
		input: ''
	  }
	  this.submit = this.submit.bind(this);
	  this.handleChange = this.handleChange.bind(this);
	}
	handleChange(e) {
	  this.setState({
		input: e.target.value,
		userAge: ''
	  });
	}
	submit() {
	  this.setState(state => ({
		userAge: state.input
	  }));
	}
	render() {
	  const buttonOne = <button onClick={this.submit}>Submit</button>;
	  const buttonTwo = <button>You May Enter</button>;
	  const buttonThree = <button>You Shall Not Pass</button>;
	  return (
		<div>
		  <h3>Enter Your Age to Continue</h3>
		  <input
			style={inputStyle}
			type="number"
			value={this.state.input}
			onChange={this.handleChange} /><br />
			{
			this.state.userAge === ''
			  ? buttonOne
			  : this.state.userAge >= 18
				? buttonTwo
				: buttonThree
			}
		</div>
	  );
	}
  };

  class GateKeeper extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		input: ''
	  };
	  this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event) {
	  this.setState({ input: event.target.value })
	}
	render() {
	  let inputStyle = {
		border: '1px solid black'
	  };
	  // change code below this line
	  if (this.state.input.length > 15) {
		inputStyle.border = '3px solid red';
	  }
	  // change code above this line
	  return (
		<div>
		  <h3>Don't Type Too Much:</h3>
		  <input
			type="text"
			style={inputStyle}
			value={this.state.input}
			onChange={this.handleChange} />
		</div>
	  );
	}
  };
