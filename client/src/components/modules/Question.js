import React, { Component } from "react";

import "./Board.css";

/*
    props:
    this.props.content
    this.props.tags
    this.props.tagColors
*/
class Question extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
        let tagsList = null;
        if (this.props.tags.length !== 0) 
        {
            tagsList = this.props.tags.map((tag) => (
                <div className="Board-tag" style={{backgroundColor: this.props.tagColors[tag]}} >{tag}</div>
            )); 
        }
        return (
            <div className="Board-questionBox">
                {tagsList}
                <div className="Board-questionContent u-textCenter">{this.props.content}</div>
            </div>
            );
  }
}

export default Question;
