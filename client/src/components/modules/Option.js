import React, { Component } from "react";
import { get, post } from "../../utilities";

import "./Board.css";
import "./Option.css";

/*
    props:
    this.props.poll_id
    this.props.text
    this.props._id
    this.props.handleAddVote
    this.props.handleRemoveVote
    this.props.userVoteIds
    this.props.nvotes

*/
class Option extends Component
{
  constructor(props)
  {
      super(props);
  }

  addVote = (event) =>
  {
    return this.props.handleAddVote(this.props._id);
  }

  removeVote = (event) =>
  {
    return this.props.handleRemoveVote(this.props._id);
  }
  
  render()
  {
    let voted = false;
    for (const voteId of this.props.userVoteIds)
    {
      if (this.props._id === voteId)
      {
        voted = true;
        break;
      }
    }

    let votebutton = null;
    if (this.props.open)
    {
      if (voted)
      {
        votebutton = <button type="submit" value="Unvote" onClick={this.removeVote} className="Option-button Option-remove u-pointer"> Unvote </button>;
      }
      else
      { 
        votebutton = <button type="submit" value="Vote" onClick={this.addVote} className="Option-button Option-add u-pointer"> Vote </button>;
      }
    }
      return ( // removed u-flex
        <div className="u-flexColumn Board-optionBox u-textCenter">
          <div className="Board-voteContainer">
            <div className="Board-votes">{this.props.nvotes + " votes"} </div>
          </div>
          <div className="Board-optionContent">{this.props.text}</div>
          {votebutton}
        </div>);
  }
}

export default Option;
