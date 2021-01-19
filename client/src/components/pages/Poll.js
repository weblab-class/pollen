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
    this.props.userId
*/
class Poll extends Component
{
  constructor(props)
  {
      super(props);
      //console.log(props)
      this.state = {
        poll:{
          question: "",
          options: [],
          tags: [],
          owner: "",
          open: true,
          addable: true,
          votes: {},
          _id: this.props._id
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

    post("/api/poll/addOption", body).then((pollObj) => 
    {
      this.setState({
        poll: pollObj,
      });
    });
  };

  handleAddVote = async opt_id =>
  {
    const body = {id: this.state.poll._id, option_id: opt_id};
    const pollObj = await post("/api/poll/vote", body);

    const userObj = await get("/api/user/info", { id: this.props.userId} );

    let curOption = null;
    for (const optObj of pollObj.options)
    {
      if (optObj._id === opt_id)
      {
        curOption = optObj;
      }
    }

    let new_user_votes = this.state.user_votes;
    if (userObj.tag in new_user_votes)
    {
      new_user_votes[userObj.tag].push(curOption);
    }
    else
    {
      new_user_votes[userObj.tag] = [curOption];
    }
    this.setState({
      poll: pollObj,
      user_votes: new_user_votes,
    });
  }

  handleRemoveVote = async opt_id =>
  {
    const body = {id: this.state.poll._id, option_id: opt_id};
    const pollObj = await post("/api/poll/unvote", body);
    const userObj = await get("/api/user/info", { id: this.props.userId} );

    let curOption = null;
    let option_map = {}; // maps option id to option object
    for (let i = 0; i < pollObj.options.length; i++)
    {
      const cur_opt_id = pollObj.options[i]._id;
      if (cur_opt_id === opt_id)
      {
        curOption = pollObj.options[i];
      }
      option_map[opt_id] = pollObj.options[i];
    }

    let new_user_votes = this.state.user_votes;
    let new_cur_user_votes = [];
    for (const voteId of pollObj.votes[this.props.userId]) // id of votes
    {
        new_cur_user_votes.push(option_map[voteId]);
    }
    new_user_votes[userObj.tag] = new_cur_user_votes;

    this.setState({
      poll: pollObj,
      user_votes: new_user_votes,
    });
  }

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
                <Board handleAddVote={this.handleAddVote} 
                        handleRemoveVote={this.handleRemoveVote}
                        userVoteIds={this.state.poll.votes[this.props.userId]}
                        poll_id={this.state.poll._id} 
                        question={this.state.poll.question} 
                        options={this.state.poll.options || []} />

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
