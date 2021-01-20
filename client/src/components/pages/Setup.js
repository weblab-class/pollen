import React, { Component } from "react";

import "./Setup.css";

/*
    props:
    this.props.userId
*/
class Setup extends Component 
{
  constructor(props) 
  {
      super(props);
  }

  render() 
  {
      // make this fancy and animated uwu
    return (
        <div className="Board-questionBox">
            Hello, {this.props.userId}! Welcome to pollen!
        </div>
    );
  }
}

export default Setup;
