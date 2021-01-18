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
          votes: {},
          _id: props._id
        },

        user_votes: {}, // user tag to [option text]

        owner_name: "",
        owner_tag: "",
      };
  }

  async componentDidMount()
  {
    const pollObj = await get("/api/poll", { id: this.state.poll._id });
    const ownerObj = await get("/api/user/info", { id: pollObj.owner });

    let option_map = {};
    for (let i = 0; i < pollObj.options.length; i++)
    {
      const opt_id = pollObj.options[i]._id;
      option_map[opt_id] = pollObj.options[i];
    }

    let votes = {};
    for (const user in pollObj.votes)
    {
      const userObj = await get("/api/user/info", { id: user} );

      votes[userObj.tag] = [];
      for (const opt of pollObj.votes[user])
      {
        const optionObj = option_map[opt];
        votes[userObj.tag].push(optionObj);
      }
    }
  
    this.setState({
      poll: pollObj,
      owner_tag: ownerObj.tag,
      owner_name: ownerObj.name,
      user_votes: votes,
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
  };

  render()
  {
      return (
        <div className="App-container">
          <div className="Poll-container">
            <div className="u-darkdarkbrown u-textCenter u-textMedium">
              <span className="u-bold">{this.state.owner_tag} </span>
              <span>'s poll</span>
            </div>

            <div className="u-flex">

              <div className="Poll-subContainer Poll-sideBar">
                <VoterList user_votes={this.state.user_votes}/>
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
