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
    this.props.tags
    this.props.tagColors
    this.props.isOwner
    this.props.votes
*/
class Board extends Component
{
  constructor(props)
  {
      super(props);
  }

  render()
  {
    let option_map = {};
    for (let i = 0; i < this.props.options.length; i++)
    {
      const opt_id = this.props.options[i]._id;
      option_map[opt_id] = 0;
    }

    //console.log("VOTESSSSSS", this.props.votes)
    for (const userId in this.props.votes)
    {
        let user_options = this.props.votes[userId];
        for (const option_id of user_options)
        {
            if (option_id in option_map)
            {
                option_map[option_id]++;
            }
            else
            {
                //console.log("err");
            }   
        }
    }

    let optionsList = [];
    for (let i = 0; i < this.props.options.length; i++)
    {
        let opt = this.props.options[i];
        let num_votes = option_map[opt._id];

        optionsList.push(<Option handleAddVote={this.props.handleAddVote} 
                                    handleRemoveVote={this.props.handleRemoveVote}
                                    userVoteIds={this.props.userVoteIds}
                                    poll_id={this.props.poll_id}
                                    _id={opt._id} 
                                    key={"Option#" + opt._id} 
                                    text={opt.text}
                                    open={this.props.open}
                                    nvotes={num_votes} />);
    }

    return (
        <div className="Board-container">
            <div>
                <Question content={this.props.question}
                            tags={this.props.tags}
                            tagColors={this.props.tagColors} 
                            isOwner={this.props.isOwner}/>
            </div>
            <div className="Board-optionsContainer">
                {optionsList}
            </div>
        </div>
    );
  }
}

export default Board;
