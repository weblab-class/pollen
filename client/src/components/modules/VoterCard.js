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
      return (
        <div className="VoterCard-container">
            <div className="u-bold"> {this.props.user} </div>
            <div> {this.props.votes}</div>
        </div>
      );
  }
}

export default VoterCard;
