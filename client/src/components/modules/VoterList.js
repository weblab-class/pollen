import React, { Component } from "react";
import VoterCard from "./VoterCard.js";

import "./VoterList.css";

/*
    props:
    this.props.user_votes
*/


class VoterList extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
      let voterCardList = [];

      let i = 0;
      for (const usertag in this.props.user_votes)
      {
        const votes = this.props.user_votes[usertag].map((opt)=>
        {
          return opt.text;
        });
        console.log(votes);
        voterCardList.push((<VoterCard key={i} user={usertag} votes={votes} />));
        i++;
      }

      return (
        <div className="VoterList-container">
            <h3 className="u-textCenter"> Who's Voting? </h3>
            {voterCardList}
        </div>
        );
  }
}

export default VoterList;
