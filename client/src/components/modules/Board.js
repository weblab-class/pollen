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
    this.props.options {option id, option color, option content}
*/
class Board extends Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
      //console.log("BOARD")
      //console.log(this.props)
      let optionsList = this.props.options.map((opt) =>
      {
          return <Option handleVote={this.handleVote} poll_id={this.props.poll_id} _id={opt._id} key={"Option#" + opt._id} text={opt.text} />
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
