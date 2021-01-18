import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./Board.css";
import "./Option.css";

/*
    props:
    this.props.poll_id
    this.props.text
    this.props._id
    this.props.handleVote

*/
class Option extends Component
{
  constructor(props)
  {
      super(props);
  }

  addVote = (event) =>
  {
    return this.props.handleVote(this.props._id);
  }
  
  render()
  {
      return (
        <div className="Board-optionBox u-textCenter u-flex">
          <span className="Board-optionContent">{this.props.text}</span>
          <button
                type="submit"
                value="Vote"
                onClick={this.addVote}
                className="Option-button u-pointer"
            > Vote </button>
        </div>);
  }
}

export default Option;
