import React, { Component } from "react";
import { get, post } from "../../utilities";
import Board from "../modules/Board.js";
import NewOption from "../modules/NewOption.js";
import VoterList from "../modules/VoterList.js";
import ClosePoll from "../modules/ClosePoll.js";
import SharePoll from "../modules/SharePoll.js";
import DeletePoll from "../modules/DeletePoll.js";

import "./Poll.css";
import "../../utilities.css";
import { socket } from "../../client-socket.js";
import poll from "../../../../server/models/poll";

/*
    props:
    this.props._id (of the poll)
    this.props.userId
    this.props.tagColors
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

        share_show: false,
        delete_show: false,
        close_show: false,
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

    socket.on("NewOption", (data) =>{
      this.setState({
        poll: {
          options: this.state.poll.options.concat([data]),
        },
      });
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

  showSharePoll = (event) =>
  {
    this.setState({
      share_show: true,
    });
  }

  showClosePoll = (event) =>
  {
    this.setState({
      close_show: true,
    });
  }

  showDeletePoll = (event) =>
  {
    this.setState({
      delete_show: true,
    });
  }

  closeSharePoll = (event) =>
  {
    this.setState({
      share_show: false,
    });
  }

  closeClosePoll = (event) =>
  {
    this.setState({
      close_show: false,
    });
  }

  closeDeletePoll = (event) =>
  {
    this.setState({
      delete_show: false,
    });
  }

  deletePoll = (event) =>
  {
    console.log("ENDPOINT PLS")
  }

  render()
  {
    let isOwner = this.props.userId === this.state.poll.owner;
    let closePoll = null;
    if (this.state.close_show)
    {
      closePoll = <ClosePoll closeClosePoll={this.closeClosePoll} user={this.state.user_info[this.props.userId]} />;
    }
    else
    {
      closePoll = <div></div>;
    }

    let shareModal = null
    if (this.state.share_show)
    {
      shareModal = <SharePoll closeSharePoll={this.closeSharePoll} />;
    }
    else
    {
      shareModal = <div></div>;
    }

    let deletePoll = null;
    if (this.state.delete_show)
    {
      deletePoll = <DeletePoll closeDeletePoll={this.closeDeletePoll} user={this.state.user_info[this.props.userId]} />;
    }
    else
    {
      deletePoll = <div></div>;
    }

      return (
        <div className="App-container">
          <div className="Poll-container">

          <div className="Poll-head">
            <div className="Poll-title u-textCenter u-darkdarkbrown u-textMedium">
                    <span className="u-bold">{this.state.owner_tag} </span>
                    <span>'s poll</span>
            </div>
            <div className="Poll-buttonContainer">
              {isOwner ? <button type="submit" value="Close Poll" onClick={this.showClosePoll} className="Poll-button u-pointer"> Close Poll </button> : null}
              <button type="submit" value="Share Poll" onClick={this.showSharePoll} className="Poll-button u-pointer"> Share Poll </button>
              {isOwner ? <div className="Poll-trash"><img src='/images/trash.svg' height="30px" onClick={this.showDeletePoll} /></div> : null}
            </div>
          </div>

          {shareModal}
          {closePoll}
          {deletePoll}

            <div className="u-flex" style={{marginLeft: "0px"}} >
              <div className="Poll-subContainer Poll-sideBar">
                <VoterList user_info={this.state.user_info} votes={this.state.poll.votes} options={this.state.poll.options}/>
              </div>

              <div className="Poll-subContainer Poll-board">
                <Board handleAddVote={this.handleAddVote}
                        handleRemoveVote={this.handleRemoveVote}
                        userVoteIds={this.state.poll.votes[this.state?.user?._id] || []}
                        poll_id={this.state.poll._id}
                        question={this.state.poll.question}
                        options={this.state.poll.options || []}
                        tags={this.state.poll.tags}
                        tagColors={this.props.tagColors}
                        isOwner = {isOwner}/>

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
