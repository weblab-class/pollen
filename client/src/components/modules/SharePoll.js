import React, { Component } from "react";
import "./SharePoll.css";

/*
    props:
    this.props.closeSharePoll

*/
class SharePoll extends Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
    return (
        <div className="SharePoll-box">

            <div className = "u-flex SharePoll-subbox">
                <span> Share the buzzing with your friends! </span>
                <span className="SharePoll-link"> {window.location.href} </span>
            </div>
            <div className = "u-flex SharePoll-subbox">
                <button className="SharePoll-close" onClick={this.props.closeSharePoll}>Close</button>
            </div>
        </div>
      );
  }
}

export default SharePoll;
