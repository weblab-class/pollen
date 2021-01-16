import React, { Component } from "react";

import "./Board.css";
import "./Option.css";

/*
    props:
    this.props.userId
    this.props.poll_id
    this.props.content
    this.props._id

*/
class Option extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  handleVote = (event) =>
  {
    console.log(this.props.userId + " voted");
    const body = {id: this.props.poll_id, option_id: this.props._id};
    post("/api/poll/vote", body);
  }

  render() 
  {
      return (
        <div className="Board-optionBox u-textCenter u-flex">
          <span className="Board-optionContent">{this.props.content}</span>
          <button
                type="submit"
                value="Vote"
                onClick={this.handleVote}
                className="Option-button u-pointer"
            > Vote </button>
        </div>);
  }
}

export default Option;
