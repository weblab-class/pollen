import React, { Component } from "react";
import { get } from "../../utilities";
import Option from "./Option.js";
import Question from "./Question.js";

import "./Board.css";

/*
    props:
    this.props.userId
    this.props.poll_id
    this.props.question
    this.props.handleAddVote
    this.props.handleRemoveVote
    this.props.options {option id, option color, option content}
    this.props.userVoteIds
*/
class Board extends Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
      let optionsList = this.props.options.map((opt) =>
      {
          return <Option handleAddVote={this.props.handleAddVote} 
                        handleRemoveVote={this.props.handleRemoveVote}
                            userVoteIds={this.props.userVoteIds}
                            poll_id={this.props.poll_id}
                            _id={opt._id} 
                            key={"Option#" + opt._id} 
                            text={opt.text} />
      });

      return (
          <div className="Board-container">
              <Question content={this.props.question} />
              {optionsList}
          </div>
    );
  }
}

export default Board;
