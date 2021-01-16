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
      console.log(props)
      console.log(window.location.href)
      this.state = {
        question: "",
        options: [],
        tags: [],
        ownerID: "",
        open: true,
        addable: true,
        voters: new Map(),
      };
  }

  componentDidMount()
  {
    get("/api/poll", { _id: this.props._id }).then((pollObj) => {
      this.setState({
        question: pollObj.question,
        options: pollObj.options,
        tags: pollObj.tags,
        ownerID: pollObj.ownerID,
        addable: pollObj.addable,
        voters: pollObj.votes,
      });
    });
  }

  addNewOption = (opt) =>
  {
    const body = {id: this.state._id, option: opt};

    post("/api/poll/addOption", body).then((pollObj) => {
      this.setState({
        options: pollObj.options,
      });
    });
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
            <Board poll_id={this.props._id} question={this.state.question} options={this.state.options} />

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
