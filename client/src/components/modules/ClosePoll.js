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
            {this.props.user.tag}, ready to decide? 
        </div>
        );
  }
}

export default ClosePoll;
