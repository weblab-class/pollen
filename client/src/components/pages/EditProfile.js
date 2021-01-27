import React, { Component } from "react";
import "./EditProfile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";
import "../modules/Modal.css";
import "../modules/NewOption.css";

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
      usernameBox: "",
      pfp_loc: "/images/pfp/defaultpfp.svg",
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

  handleChangePfp = (pfp_loc) => {
    return async() => {
      const body = {picture_link: pfp_loc};
      const userObj = await post("/api/user/self", body);
      this.setState({
        user: userObj,
      });
    }
  }

  handleTypingUsername = (e) => {
    this.setState({
      usernameBox: e.target.value,
    });
  }

  // api endpoint to change username
  handleChangeUsername = async() => {
    const body = {userTag: "@" + this.state.usernameBox};
    const userObj = await post("/api/user/self", body);
    this.setState({
      user: userObj,
    });
  }

  render() {
    let pfpList = null;
    if (this.props.beeIcons.length !== 0) {
      pfpList = this.props.beeIcons.map((icon) => (
        <img src={icon} alt="bee" width="100px" height="100px"
          className="EditProfile-pfp u-pointer" 
          onClick={this.handleChangePfp(icon)}
        />
      ));
    } else {
      pfpList = <div>no icons available :(</div>;
    }
    return (
      <div> 
        <br/>
        <h1 className="u-textCenter">edit profile</h1> 
        {/* so basically show a row of circle pfps and when they click to choose make the circle bigger */}
        <br/>
        <h2 className="EditProfile-heading" ><span className="u-textCenter EditProfile-highlightPurple" > &nbsp;&nbsp;pick a new profile icon!&nbsp;&nbsp; </span></h2>
        <div className="EditProfile-pfpContainer">
          {pfpList}
        </div>
        <br/>
        <h2 className="EditProfile-heading" ><span className="u-textCenter EditProfile-highlightPurple" > &nbsp;&nbsp;change your username:&nbsp;&nbsp; </span></h2>

        <div className="u-flex" style={{justifyContent: "center"}}>
            <input
                type="text"
                placeholder="bobthebee"
                value={this.state.usernameBox}
                onChange={this.handleTypingUsername}
                className="Modal-input"
                style={{marginRight: "1px"}}
            />
          <button
              type="submit"
              value={this.state.usernameBox}
              onClick={this.handleChangeUsername}
              className="Modal-submit u-pointer"
              style={{marginLeft: "1px"}}
          > change </button>
          {/* <button className="Modal-close" onClick={this.props.closeCreator}>Close</button> */}
        </div>
      </div>
    );
  }
}

export default EditProfile;
