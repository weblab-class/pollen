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
        // user_votes: {}, // user tag to [option text]
        user: {},
        user_info: {},

        owner_name: "",
        owner_tag: "",
      };
  }

  async componentDidMount()
  {
    const user = await get('/api/user/self', {})
    this.setState({
        user: user,
    });

    const pollObj = await get("/api/poll", { id: this.state.poll._id });
    const ownerObj = await get("/api/user/info", { id: pollObj.owner });

    let option_map = {};
    for (let i = 0; i < pollObj.options.length; i++)
    {
      const opt_id = pollObj.options[i]._id;
      option_map[opt_id] = pollObj.options[i];
    }
    console.log("user", user)
    let user_info_map = {};
    user_info_map[user._id] = {
      name: user.displayName,
      tag: user.userTag
    }
    for (const user_id in pollObj.votes)
    {
      if(user_id!=this.state.userId){
        try{
          user_info_map[user_id] = await get("/api/user/info", { id: user_id} );
        }catch(err){console.error(err);}
      }
    }

    this.setState({
      poll: pollObj,
      owner_tag: ownerObj.tag,
      owner_name: ownerObj.name,
      user_info: user_info_map,
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

    this.setState({
      poll: pollObj,
    });
  }

  handleRemoveVote = async opt_id =>
  {
    const body = {id: this.state.poll._id, option_id: opt_id};
    const pollObj = await post("/api/poll/unvote", body);

    this.setState({
      poll: pollObj,
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
                <VoterList user_info={this.state.user_info} votes={this.state.poll.votes} options={this.state.poll.options}/>
              </div>

              <div className="Poll-subContainer Poll-board">
                <Board handleAddVote={this.handleAddVote}
                        handleRemoveVote={this.handleRemoveVote}
                        userVoteIds={this.state.poll.votes[this.state?.user?._id] || []}
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
