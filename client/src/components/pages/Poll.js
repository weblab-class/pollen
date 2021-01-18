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
      this.state = {
        poll:{
          question: "",
          options: [],
          tags: [],
          owner: "",
          open: true,
          addable: true,
          voters: new Map(),
          _id: props._id
        },

        owner_name: "",
        owner_tag: "",
      };
      //console.log("INIT", this.state)
  }

  componentDidMount()
  {
    get("/api/poll", { id: this.state.poll._id }).then((pollObj) => {
      //console.log("POLLED", pollObj)
      this.setState({
        poll: pollObj
      });
    });
  }

  addNewOption = (opt) =>
  {
    const body = {id: this.state.poll._id, option: opt};

    post("/api/poll/addOption", body).then((pollObj) => {
      this.setState({
        poll: pollObj,
      });
    });

    get("/api/user/info", { id: this.state.poll.owner }).then((userObj) => {
      this.setState({
        owner_name: userObj.name,
        owner_tag: userObj.tag,
      });
    });
  };

  render()
  {
      return (
        <div className="App-container">
          <div className="Poll-container">
            <div className="u-darkdarkbrown u-textCenter u-textMedium">
              <span className="u-bold">{"@" + this.state.poll.owner_tag} </span>
              <span>'s poll</span>
            </div>

            <div className="u-flex">

              <div className="Poll-subContainer Poll-sideBar">
                <VoterList voters={this.state.poll.voters} />
              </div>

              <div className="Poll-subContainer Poll-board">
                <Board poll_id={this.state.poll._id} question={this.state.poll.question} options={this.state.poll.options || []} />

                <div className="u-textCenter">
                  <NewOption addNewOption={this.addNewOption} />
                </div>
              </div>

            </div>

          </div>
        </div>
      );
  }
}

export default Poll;
