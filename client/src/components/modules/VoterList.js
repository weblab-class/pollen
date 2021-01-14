import React, { Component } from "react";

/*
    props:
    this.props.votes

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
        <div>
          Who's Voting?
        </div>);
  }
}

export default VoterList;
