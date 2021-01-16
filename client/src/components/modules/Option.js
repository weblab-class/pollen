import React, { Component } from "react";

import "./Board.css";
import "./Option.css";

/*
    props:
    this.props.poll_id
    this.props.text
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
    const body = {id: this.props.poll_id, option_id: this.props._id};
    post("/api/poll/vote", body);
  }

  render() 
  {
      return (
        <div className="Board-optionBox u-textCenter u-flex">
          <span className="Board-optionContent">{this.props.text}</span>
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
