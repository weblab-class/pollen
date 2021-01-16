import React, { Component } from "react";
import Grid from "../modules/Grid.js";

import "./Profile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import Pfp from "../modules/bee_pfp.png";

/*
    props:
    this.props.userId
*/

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                myPolls: [],
                sharedPolls: [],
            },
            view: "my polls", // either "my polls" or "shared with me"
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

    viewMyPolls = () => {
        this.setState({view: "my polls"});
    }

    viewShared = () => {
        this.setState({view: "shared with me"});
    }

    render() {
        console.log(this.state.user);
        return (
            <div className="Profile-container">
                <div className="Profile-sidebar">
                    <img className="Profile-pfp" src={Pfp} alt="bee" width="100px" height="100px" />
                    <h2 className="Profile-displayname">{this.state.user.displayName}</h2>
                    <p className="Profile-username">{this.state.user.userTag}</p>

                    <div className="Profile-sidebuttons u-flexColumn">
                        <div className="Profile-subTop">
                            <div className="u-padding" onClick={this.viewMyPolls} >my polls</div>
                            <div className="u-padding" onClick={this.viewShared} >shared with me</div>
                        </div>
                        <div className="Profile-subBot">
                            <button
                                type="submit"
                                value="Create Poll"
                                onClick={this.createPoll}
                                className="Profile-button u-pointer"> + create a poll </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h2>  {this.state.view}</h2>
                    <Grid user={this.state.user} view={this.state.view} />
                </div>
            </div>
        );
    }
}

export default Profile;