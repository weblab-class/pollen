import React, { Component } from "react";
import "./EditProfile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import "../modules/Modal.css";

/*
    props:
    user object (passed from profile) (or get request again??)
    beeIcons (passed fro app.js?)
*/

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    }
  }

  componentDidMount() {
    // get('/api/user', {id: this.props.userId})
    get('/api/user/self', {}).then((user) => {
        this.setState({
            user: user,
        });
    });
  }

  // example
  /* handleAddVote = async opt_id =>
  {
    const body = {id: this.state.poll._id, option_id: opt_id};
    const pollObj = await post("/api/poll/vote", body);

    this.setState({
      poll: pollObj,
    });
  } */

  // api endpoint to change user icon
  handleChangePfp = async pfp_loc => {
    const userObj = await post("/api/edit/icon", pfp_loc);
    this.setState({
      user: userObj,
    });
  }

  // api endpoint to change username
  handleChangeUsername = async username => {
    const userObj = await post("/api/edit/username", username);
    this.setState({
      user: userObj,
    });
  }

  render() {
    let pfpList = null;
    if (this.props.beeIcons.length !== 0) {
      pfpList = this.props.beeIcons.map((icon) => (
        <img className="Profile-pfp" src={icon} alt="bee" width="100px" height="100px" />
      ));
    } else {
      pfpList = <div>no icons available :(</div>;
    }
    return (
      <div> 
      <h1 className="u-textCenter">edit profile</h1> 
      {/* so basically show a row of circle pfps and when they click to choose make the circle bigger */}
      <h2 className="EditProfile-heading" ><span className="u-textCenter EditProfile-highlightPurple" > &nbsp;&nbsp;pick a new profile icon!&nbsp;&nbsp; </span></h2>
      <div className="EditProfile-pfpContainer">
        {pfpList}
      </div>
      <h2 className="EditProfile-heading" ><span className="u-textCenter EditProfile-highlightPurple" > &nbsp;&nbsp;change your username:&nbsp;&nbsp; </span></h2>
      <div className="u-flex Modal-box Modal-topbox">
          <input
              type="text"
              placeholder="bobthebee"
              // value={this.state.question}
              // onChange={this.handleQuestionChange}
              className="Modal-input"
          />
      </div>
      <div className = "u-flex Modal-box">
        <button
            type="submit"
            value="Change Username"
            // onClick={this.handleSubmit}
            className="Modal-submit u-pointer"
        > change </button>
        {/* <button className="Modal-close" onClick={this.props.closeCreator}>Close</button> */}
      </div>
      </div>
    );
  }
}

export default EditProfile;
