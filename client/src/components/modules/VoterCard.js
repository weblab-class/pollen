import React, { Component } from "react";
import "./VoterCard.css";

/*
    props:
    this.props.user
    this.props.votes
*/
class VoterCard extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
    const voteList = this.props.votes.map((voteObj) =>
    {
      return <div> {">" + voteObj} </div>;
    });
      return (
        <div className="VoterCard-container">
            <div className="VoterCard-name u-bold"> {this.props.user} </div>
            {voteList}
        </div>
      );
  }
}

export default VoterCard;
