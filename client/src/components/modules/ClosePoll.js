import React, { Component } from "react";

import "./ClosePoll.css";

/*
    props:
    this.props.user
*/
class ClosePoll extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {

    return (
        <div className="ClosePoll-container">
            <div className="ClosePoll-text"> {this.props.user.tag}, ready to decide? </div>
        </div>
        );
  }
}

export default ClosePoll;
