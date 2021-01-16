import React, { Component } from "react";

import "./Board.css";
import "./Option.css";

/*
    props:
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
