import React, { Component } from "react";

import "./Board.css";

/*
    props:
    this.props.content
*/
class Question extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
      return (
        <div className="Board-questionBox">
            <div className="Board-questionContent u-textCenter">{this.props.content}</div>
        </div>
        );
  }
}

export default Question;
