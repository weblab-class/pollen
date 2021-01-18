import React, { Component } from "react";
import VoterCard from "./VoterCard.js";

import "./VoterList.css";

/*
    props:
    this.props.voters
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
      for (const user in this.props.voters)
      {
        //console.log(this.props.voters);
        const votes = this.props.voters[user];
        voterCardList.push((<VoterCard key={i} user={user} votes={votes} />));
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
