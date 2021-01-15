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
      return (
        <div className="VoterList-container">
            <h3 className="u-textCenter"> Who's Voting? </h3>
            {this.props.voters.map((voter, i) => 
                {
                    return <VoterCard key={i} user={voter.user} votes={voter.votes} />;
                })
            }
        </div>
        );
  }
}

export default VoterList;
