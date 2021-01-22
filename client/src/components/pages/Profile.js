import React, { Component } from "react";
import Grid from "../modules/Grid.js";
import Modal from "../modules/Modal.js";

import "./Profile.css";
import { get, post } from "../../utilities.js";
import "../../utilities.css";
import Pfp from "../imgs/bee_pfp.png";

/*
    props:
    this.props.userId
    this.props.tagColors
*/

// colors and stuff

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                myPolls: [],
                sharedPolls: [],
            },
            show_create: false,
            view: "my polls", // either "my polls" or "shared with me"
        }
    }

    componentDidMount() {
        // get('/api/user', {id: this.props.userId})
        get('/api/user/self', {}).then((user) => {
            console.log("USER", user)
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

    createPoll = (event) =>
    {
        this.setState({show_create: true});
    }

    closeCreator = (event) =>
    {
        this.setState({show_create: false});
    }

    addNewPoll = (question, tags) =>
    {
        return post('/api/poll', {question: question, tags: tags});
    }

    render() {
        console.log(this.state.user);
        if (!this.state.show_create)
        {
            return (
                <div className="App-container">
                <div className="Profile-container">
                    <div className="Profile-sidebar">
                        <img className="Profile-pfp" src={Pfp} alt="bee" width="100px" height="100px" />
                        <h2 className="Profile-displayname">{this.state.user.displayName}</h2>
                        <p className="Profile-username">{this.state.user.userTag}</p>
                        <div className="Profile-sidebuttons u-flexColumn">
                            <div className="Profile-subTop">
                                <div className="u-morepadding" onClick={this.viewMyPolls} >my polls</div>
                                <div className="u-morepadding" onClick={this.viewShared} >shared with me</div>
                            </div>
                            <div className="Profile-subBot">
                                <button
                                    type="submit"
                                    value="Create Poll"
                                    onClick={this.createPoll}
                                    className="Profile-button u-pointer"> + create a poll </button>
                                <button
                                    type="submit"
                                    value="Edit Profile"
                                    // onClick={this.createPoll}
                                    onClick={() => {window.location.href = "/profile/edit";}}
                                    className="Profile-button u-pointer"> edit profile </button>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>  {this.state.view}</h2>
                        <Grid tagColors={this.props.tagColors} user={this.state.user} view={this.state.view} />
                    </div>
                </div>
                </div>
                );
        }
        else
        {
            return <Modal tagColors={this.props.tagColors} addNewPoll={this.addNewPoll} show={this.state.show_create} closeCreator={this.closeCreator}/>;
        }
    }
}

export default Profile;
