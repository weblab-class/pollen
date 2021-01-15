import React, { Component } from "react";
import Grid from "../modules/Grid.js";

import "./Profile.css";
import "../../utilities.css";
import Pfp from "../modules/bee_pfp.png";

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
            // <h1>hello</h1>
            <div className="Profile-container">
                <div className="u-textCenter">
                    <img className="Profile-pfp" src={Pfp} alt="bee" width="100px" height="100px" />
                    <h2>{this.props.display_name}</h2>
                    <p>@{this.props.username}</p>
                    <div className="u-padding" >my polls</div>
                    <div className="u-padding" >shared with me</div>
                    <div className="u-padding" >+ create a poll</div>
                </div>
                <Grid />
            </div>
        );
    }
}

export default Profile;