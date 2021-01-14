import React, { Component } from "react";
import { get } from "../../utilities";
import Board from "../modules/Board.js";
import NewOption from "../modules/NewOption.js";

import "./Poll.css";
import "../../utilities.css"

/*
    props:
    this.props._id (of the poll)
*/
class Poll extends Component 
{
  constructor(props) 
  {
      super(props);

      this.state = {
        question: "Am I a Bee?????", // string
        options: [{_id: 1, content: "yes"}, {_id: 2, content: "no"}, {_id:3, content: "maybe so"}],
        ownerID: "alicethebee", 
        //votes and stuf
      };
  }

  componentDidMount() 
  {
    // fix syntax once backend is good
    /*get("/api/poll", { pollID: this.props._id }).then((pollObj) => {
      this.setState({
        question: pollObj.question,
        options: pollObj.options,
        ownerID: pollObj.ownerID,
        // and MORE COMING SOON!
      });
    });*/
  }

  addNewOption = (opt) =>
  {
    // this id business is TEMPORARY USE MONGO STUFF INSTEASD!!!!!!!!!!!!!!!!
    /*
    this.setState({
      options: this.state.options.concat([optObj]),
    });
    */

    let new_id = this.state.options[this.state.options.length - 1]._id + 1;

    this.setState({
      options: this.state.options.concat([{_id: new_id, content: opt}]),
    });
  };

  render() 
  {
      return (
      <div className="Poll-container">
        <div className="u-textCenter">
          <span className="u-bold">{"@" + this.state.ownerID} </span>
          <span>'s poll</span>
        </div>
        <Board question={this.state.question} options={this.state.options} />
        <div className="u-textCenter">
          <NewOption addNewOption={this.addNewOption} />
        </div>
      </div>
      );
  }
}

export default Poll;
