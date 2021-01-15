import React, { Component } from "react";
import Grid from "../modules/Grid.js";

/*
    props:
    this.props.user
*/

class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Profile-container">
                <div className="u-textCenter">
                    <img style="border-radius: 50%;" src="../bee_pfp.png" width="50px" height="50px" />
                    <h2>{this.props.display_name}</h2>
                    <p>@{this.props.username}</p>
                    <div></div>
                </div>
                {/* <Grid /> */}
            </div>
        );
    }
}

export default Profile;