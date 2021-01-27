import React, { Component } from "react";

import "./ClosePoll.css";

/*
    props:
    this.props.user
    submitDecision
*/
class ClosePoll extends Component 
{
  constructor(props) 
  {
      super(props);

      this.state = {
        decision: "",
      };
  }

  handleTyping = (event) =>
  {
    this.setState({
        decision: event.target.value,
    });
  }

  handleSubmitDecision = (event) =>
  {
      event.preventDefault();
      this.props.submitDecision(this.state.decision);
      this.setState({
        decision: "",
        });
  }

  render() 
  {
    return (
        <div className="ClosePoll-container">
            <div className="ClosePoll- u-bold"> {this.props.user.tag}, ready to decide? </div>
            <div className="ClosePoll-text"> mark your final decision below for future reference! </div>
            <div className="u-flex ClosePoll-buttons" style={{justifyContent: "center"}}>
                <input
                    type="text"
                    placeholder={"what is your final decision? ..."}
                    value={this.state.decision}
                    onChange={this.handleTyping}
                    className="ClosePoll-input"
                />
                <button
                    type="submit"
                    value="buzz out"
                    onClick={this.handleSubmitDecision}
                    className="ClosePoll-submit u-pointer"
                    style={{marginLeft: "1px"}}
                > buzz out! </button> 
                <button className="ClosePoll-close" onClick={this.props.closeClosePoll}>close</button>
            </div>
        </div>
        );
  }
}

export default ClosePoll;
