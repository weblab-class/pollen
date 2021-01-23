import React, { Component } from "react";
import "./EditProfile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import "./Profile.css";

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

  changePfp() {
    // api endpoint to change user icon
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
      <> 
      <h1 className="u-textCenter">edit profile</h1> 
      {/* so basically show a row of circle pfps and when they click to choose make the circle bigger */}
      <h2 className="u-textCenter">pick a new profile icon!</h2>
      <div className="EditProfile-pfpContainer">
        {pfpList}
      </div>
      </>
    );
  }
}

export default EditProfile;
