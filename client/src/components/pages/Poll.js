import React, { Component } from "react";
import { get, post } from "../../utilities";
import Board from "../modules/Board.js";
import NewOption from "../modules/NewOption.js";
import VoterList from "../modules/VoterList.js";

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
        tags: ["food"],
        ownerID: "alicethebee", 
        voters: [{user: "alicethebee", votes:[1, 2, 3]},
                  {user: "emilythebee", votes:[1]},
                  {user: "anithebee", votes:[3]},
                  {user: "ryanthebee", votes:[1, 3]},
                  {user: "evethebee", votes:[]},
                  {user: "ronthebee", votes:[1]}],
        addable: true,
        _id: "sdfjseiofheof",
      };
  }

  componentDidMount() 
  {
    /*get("/api/poll", { _id: this.props._id }).then((pollObj) => {
      this.setState({
        question: pollObj.question,
        options: pollObj.options,
        tags: pollObj.tags,
        ownerID: pollObj.ownerID,
        addable: pollObj.addable,
        _id: pollObj._id,
      });
    });*/

    // pull from backend wooohoo
  }

  addNewOption = (opt) =>
  {
    /*let new_id = this.state.options[this.state.options.length - 1]._id + 1;

    const body = {
      "question": this.state.question,
      "options": this.state.options.concat([{_id: new_id, content: opt}]),
      "tags": this.state.tags,
      "addable": this.state.addable,
      "admin": true,
      "_id": "a79FQ7yi7"
    };
    post("/api/poll", body).then((pollObj) => {
      this.setState({
        options: pollObj.options,
      });
    });*/
  };

  render() 
  {
      return (
      <div className="Poll-container">
        <div className="u-darkdarkbrown u-textCenter u-textMedium">
          <span className="u-bold">{"@" + this.state.ownerID} </span>
          <span>'s poll</span>
        </div>

        <div className="u-flex">

          <div className="Poll-subContainer Poll-sideBar">
            <VoterList voters={this.state.voters} />
          </div>

          <div className="Poll-subContainer Poll-board">
            <Board question={this.state.question} options={this.state.options} />

            <div className="u-textCenter">
              <NewOption addNewOption={this.addNewOption} />
            </div>
          </div>

        </div>

      </div>
      );
  }
}

export default Poll;
