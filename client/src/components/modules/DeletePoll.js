import React, { Component } from "react";

import "./ClosePoll.css";

/*
    props:
    this.props.user
*/
class DeletePoll extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
    return (
        <>
            <div className="ClosePoll-container">
                {this.props.user.tag}, are you sure you want to delete this poll? You can't undo this action.
            </div>
            <div className = "u-flex SharePoll-subbox">
                <button className="ClosePoll-close" onClick={this.props.closeSharePoll}>close</button>
            </div>

        </>
        
        );
  }
}

export default DeletePoll;
