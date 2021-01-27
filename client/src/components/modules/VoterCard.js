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
    let i = 0;
    const voteList = this.props.votes.map((voteObj) =>
    {
      i++;
      return <div key={i}> {">" + voteObj} </div>;
    });

      return (
        <div className="VoterCard-container">
            <img className="VoterCard-pfp" 
                                src={this.props.pfp} alt="bee" 
                                width="50px" height="50px" />
            <div>
              <div className="VoterCard-name u-bold"> {this.props.user} </div>
              {voteList}
            </div>
        </div>
      );
  }
}

export default VoterCard;
