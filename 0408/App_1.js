import { render } from '@testing-library/react';
import React from 'react';

function formatDate(date) {
  return date.toLocaleDateString();
}

class Avatar extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <img
        className="Avatar"
        src = {this.props.user.avatarUrl}
        alt = {this.props.user.name}
      />
    );
  }
}

/*function Avatar(props) {
  return (
    <img
      className="Avatar"
      src={props.user.avatarUrl}
      alt={props.user.name}
    />
  );
}
*/
class UserInfo extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className = "UserInfo">
        <Avatar user = {this.props.user}/>
        <div className = "UserInfo-name">{this.props.user.name}</div>
      </div>
    );
  }
  }

/*
function UserInfo(props) {
  return (
    <div className="UserInfo">
      <Avatar user={props.user} />
      <div className="UserInfo-name">{props.user.name}</div>
    </div>
  );
}
*/

class App extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="Comment">
        <UserInfo user={this.props.author} />
        <div className="Comment-text">{this.props.text}</div>
        <div className="Comment-date">
          {formatDate(this.props.date)}
        </div>
      </div>
    );
  }
  }

/*
function App(props) {
  return (
    <div className="Comment">
      <UserInfo user={props.author} />
      <div className="Comment-text">{props.text}</div>
      <div className="Comment-date">
        {formatDate(props.date)}
      </div>
    </div>
  );
}
*/


export default App;
