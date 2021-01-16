import React, { Component } from "react";

import "./Board.css";

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

  render() 
  {
      return (
        <div className="Board-optionBox">
          <div className="Board-optionContent u-textCenter">{this.props.content}</div>
        </div>);
  }
}

export default Option;
