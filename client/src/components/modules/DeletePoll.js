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
                <div className="ClosePoll-text"> {this.props.user.tag}, are you sure you want to delete this poll? You can't undo this action. </div>
                <div className = "u-flex ClosePoll-subbox">
                    <button className="ClosePoll-yes" onClick={this.props.deleteFunc}>yes</button>
                    <button className="ClosePoll-no" onClick={this.props.closeDeletePoll}>no</button>
                </div>
            </div>
        </>
        );
  }
}

export default DeletePoll;
