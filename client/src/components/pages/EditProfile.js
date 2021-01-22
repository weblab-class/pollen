import React, { Component } from "react";
// import "./EditProfile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import Pfp from "../imgs/bee_pfp.png";

/*
    props:
    user object (passed from profile) (or get request again??)
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

  render() {
    return (
      <div>edit profile</div>
    );
  }
}

export default EditProfile;